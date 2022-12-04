
import * as mongo from '../../../Util/connections/mongo/mongo_connection';
import * as mimeParse from '../../../Util/mime_parse';
import * as l from '../../../Util/logger';
import { ObjectId } from 'mongodb';
import DAOCallback from '../commons';
import { GameProject } from '../../../../../commons/src/models/game/project';
import { GameProjectResource } from '../../../../../commons/src/models/game/resources';
import { deleteGameResource } from './delres.helper';

export interface UploadGameResourceRequest{
    /**
     * The MongoDB Project ID
     */
    projectid: string,
    /**
     * The Game Entry ID
     */
    gameid: string,
    /**
     * An optional resourceId to replace after uploading this resource
     */
    replace: string | undefined | null
}

/**
 * Upload a FormData resource to the file system sent by frontend.
 * Optionally can replace an existing file if `replace` property is defined.
 * 
 * @param {UploadGameResourceRequest} data Sent from Frontend
 * @param {File} file File object decoded by multer
 * @param {string} userId The user uploading the resource
 * @param {function(boolean, string, Object)} callback status, desc, new project
 */
 export function uploadGameResource(requestBody: UploadGameResourceRequest, file: Express.Multer.File, userId: string, callback: DAOCallback){

    const mime = file.mimetype;
    const projectId = String(requestBody.projectid);
    const gameId = String(requestBody.gameid);
    const projectIdAsObjectId = mongo.toObjectId(projectId);
    const replaceResourceId = requestBody.replace;
    const fileType = mimeParse.findResourceTypeFromMimeType(file.mimetype);

    if (fileType == null){
        callback(false, `Unsupported mime type ${mime}`, null);
        return;
    }

    if (replaceResourceId == undefined || replaceResourceId == null || replaceResourceId == ''){

        // Just upload the game resource
        const newResource = generateNewResource(null, fileType, file);
        handleInsertNewResource(newResource, projectIdAsObjectId, callback);
    }
    else{

        // Replace an existing game resource with this newly uploaded resource
        const replaceResId = replaceResourceId as string;
        handleGameResourceReplace(
            gameId, userId, projectIdAsObjectId, replaceResId, 
            file, fileType, 
            callback);
    }
}

async function returnEntireProject(projectId: ObjectId, callback: DAOCallback){
    try{
        const project = await getGameProject(projectId);
        callback(true, 'OK', project);
    }
    catch(error){
        callback(false, String(error), null);
    }
}

function generateNewResource(
    resourceId: string | null,
    fileType: string,
    file: Express.Multer.File
): any{
    const filePath = String(file.path);
    const displayNameComponents = file.originalname.split('/');
    const displayName = displayNameComponents[Math.max(displayNameComponents.length - 1, 0)];
    // const objectId = resourceId ?? new ObjectId().toHexString();
    const objectId = resourceId == null ? new ObjectId() : new ObjectId(resourceId!);
    const newResource = {
        _id: objectId,
        displayName: displayName,
        filename: filePath,
        type: fileType
    };

    return newResource;
}

function handleInsertNewResource(
    resource: GameProjectResource,
    projectId: ObjectId,
    callback: DAOCallback
){
    mongo.Collections.getGameProjects().updateOne(
        { _id: projectId},
        { $push: { resources: resource } },
        (err, res) => {
            if (err == undefined){
                returnEntireProject(projectId, callback);
            }
            else{
                l.logc(err.message);

                // TODO: Cleanup newly uploaded resource because we didn't record it.
                callback(false, 'Could not record new resource', null);
            }
        }
    );
}

function handleSetResources(
    resources: GameProjectResource[],
    projectId: ObjectId,
    callback: DAOCallback
){
    mongo.Collections.getGameProjects().updateOne(
        { _id: projectId},
        { $set: { resources: resources } },
        (err, res) => {
            if (err == undefined){
                returnEntireProject(projectId, callback);
            }
            else{
                l.logc(err.message);

                // TODO: Cleanup newly uploaded resource because we didn't record it.
                callback(false, 'Could not updated project resources', null);
            }
        }
    );
}

/**
 * Remove the existing game resource and 
 * add a new resource with the same ID, 
 */
async function handleGameResourceReplace(
    gameId: string,
    userId: string,
    projectId: ObjectId,
    replaceResId: string,
    file: Express.Multer.File,
    fileType: string | null,
    callback: DAOCallback
){
    try{

        const project = await getGameProject(projectId);
        const resourceToReplaceIndex = project.resources.findIndex(res => res._id == replaceResId);
        const resourceToReplace = project.resources[resourceToReplaceIndex];
        const resourceId = resourceToReplace._id.toString();

        if (resourceToReplace == undefined){
            l.logc('Requested Resource Reaplce = "' + replaceResId + '"');
            throw new Error('Could not find resource to replace');
        }

        if (resourceToReplace.type != fileType){
            throw new Error('Replacing file type must be equal to existing file type');
        }

        await deleteExistingResource(gameId, resourceId, userId);

        // Splice a new resource into the existing resource's index and save it.
        const newResource = generateNewResource(resourceId, fileType, file);
        newResource.displayName = resourceToReplace.displayName;
        project.resources.splice(resourceToReplaceIndex, 1, newResource);
        handleSetResources(project.resources, projectId, callback);
    }
    catch(error){
        const errStr = String(error);
        callback(false, errStr, null);
    }
}

/**
 * Fetch the game project
 */
function getGameProject(projectId: ObjectId): Promise<GameProject>{
    return new Promise<GameProject>((resolve, reject) => {
        mongo.Collections.getGameProjects().findOne(
            { _id: projectId },
            (err, res) => {
                if (err){
                    l.logc(err.message);
                    reject('Could not find game project');
                }
                else{
                    resolve(res! as GameProject);
                }
            }
        )
    });
}

/**
 * Delets the phyiscal file & resource from the project
 */
function deleteExistingResource(
    gameId: string,
    resourceId: string,
    userId: string
): Promise<void>{

    return new Promise((resolve, reject) => {
        deleteGameResource(gameId, resourceId, userId, (success, msg, res) => {
            if (success){
                resolve();
            }
            else{
                reject(msg);
            }
        });
    })

}