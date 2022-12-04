
import * as mongo from '../../../Util/connections/mongo/mongo_connection';
import * as mimeParse from '../../../Util/mime_parse';
import * as utils from '../../../Util/utils';
import { ObjectId } from 'mongodb';
import fs from 'fs';
import DAOCallback from '../commons';

/**
 * 
 * @param fileBasePathExcludingUploadPath 'Base path for the index.ts file not including fs/res_upload'
 */
 export function deleteGameResource(
    gameId: string, resourceId: string, userId: string,
    callback: DAOCallback
){
    const fileBasePathExcludingUploadPath = utils.getRootPath();

    console.log('deleteGameResource called', gameId, resourceId, userId);

    utils.checkUserCanModifyGame(gameId, userId, (status, projectId) => {
        if (!status){
            callback(false, 'User not allowed to delete this game resource', null)
            return;
        }

        mongo.Collections.getGameProjects().findOne(
            {_id: mongo.toObjectId(projectId)},
            (err, doc) => {
                if (err){
                    callback(false, 'Could not find game with project id ' + projectId, null);
                    return;
                }

                const resourceArray = doc!['resources'] as Array<any>;
                const matchingResource = resourceArray.filter((r) => {return r._id == resourceId});

                if (matchingResource.length == 0){
                    callback(false, 'Could not find project resource with id ' + resourceId, null);
                    return
                }

                const filePath = fileBasePathExcludingUploadPath + '/' + matchingResource[0].filename;

                console.log('deleteGameResource going to delete', filePath);

                fs.unlink(filePath, (err) => {
                    console.log('deleteGameResource fs err', JSON.stringify(err));

                    mongo.Collections.getGameProjects().updateOne(
                        {_id: mongo.toObjectId(projectId)},
                        { $pull: { resources: { _id: mongo.toObjectId(resourceId) } } },
                        (err, doc) => {
                            if (err){
                                console.log('deleteGameResource', JSON.stringify(err))
                            }
                            else{
                                callback(true, 'Deleted resource successfully!', doc!);
                            }
                        }
                    )
                });
            }
        );

        /*
        mongo.models.GameProject.updateOne(
            {_id: projectId},
            {$pull: {resources: resourceId} },
            (err, res) => {
                if (err){
                    l.logc(JSON.stringify(err), 'delGameRes');
                    callback(false, 'Could not remove game resource', null);
                }


            }
        );*/
    });
}