import * as l from '../../util/logger';
import * as sql from '../../util/connections/sql/sql_connection';
import * as mongo from '../../util/connections/mongo/mongo_connection';
import * as utils from '../../util/utils';
import { v4 as uuidv4 } from 'uuid';
import { DateTime, ToSQLOptions } from 'luxon';
import * as mimeParse from '../../util/mime_parse';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { GameType, SaveGameRequestData } from '../../../../commons/src/models/game/game';
import * as LevelInitData from '../../../../commons/src/models/game/levels/initdata';
import { ObjectId } from 'mongodb';
import DAOCallback from './commons';
import { updateObjectives, updateTrackers } from './metrics';

/**
 * Create a game entry
 * @param {Object} data 
 * @param {function(boolean, string, Object)} callback success, desc, result
 */
export function createGame(data: any, callback: DAOCallback){

    // BIG TODO ///////////
    // todo: For a game, clone & copy the data/resources of the template.
    ///////////////

    const c = sql.columns.gameEntry;
    let columns_arr = [
        c.id,
        c.authorId,
        c.name, c.type, 
        c.isTemplate, c.isPublished, c.parentEntryId,
        c.levelSwitch, 
        c.multiUserLimit, c.progressBoundType, 
        c.reportOptObjectives, 
        c.reportOptGuidanceTrg, 
        c.reportOptStudentUsage, 
        c.reportOptLevelScore,
        c.reportOptLevelTime
    ]
    let values = [
        0,
        data.author_id,
        data.name, data.type, 
        data.is_template, data.is_published, data.parent_entry_id,
        data.level_switch,
        data.multi_user_limit, data.progress_bound_type,
        data.rep_opt_objectives,
        data.rep_opt_guidance_trg,
        data.rep_opt_student_usg,
        data.rep_opt_level_score,
        data.rep_opt_level_time
    ]

    // create game entry in sql,
    // then create games document in mongo

    let sampleLevels: Object[] = []

    if (data.type == GameType.Singleplayer){
        sampleLevels = LevelInitData.getSinglePlayerLevelInitData(data.level_switch, null);
    }
    else if (data.type == GameType.Multiplayer){
        sampleLevels = LevelInitData.getMultiPlayerLevelInitData(data.level_switch, null);
    }
    else{
        callback(false, `Unknown game type: "${data.type}"`, null);
    }

    const proj = { resources: [], levels: sampleLevels };
    mongo.Collections.getGameProjects().insertOne(proj, (mongo_error, result) => {
        if (mongo_error != null){
            callback(false, 'Error creating Game Project', null);
            return;
        }
    
        /**
         * .toString() is IMPORTANT. document._id are ObjectIDs
         * and not strings. Trying to pass it to MySQL with throw
         * head scratching errors where, the 'INSERT INTO'
         * contains values such as '_bsonType'.
         * 
         * Had to learn this the hard way. DO NOT FORGET!
         */
        const projectId = result!.insertedId.toHexString();

        columns_arr.push(c.projectId);
        values.push(projectId);

        const template = `${Array(columns_arr.length).fill('?')}`
        const columns = columns_arr.join(', ');
        const query = `INSERT INTO ${sql.tables.gameEntry} (${columns}) VALUES (${template})`;

        sql.getPool()!.query({
            sql: query,
            values: values
        }, (err, results, fields) => {

            if (err == null){
                const response = {
                    gameId: results.insertId
                };
                callback(true, "Successfully inserted", response);
            }
            else{
                callback(false, "Server Error occured", null);
            }
        });
    });
}

/**
 * Save Edited game entry
 * @param {Object} data 
 * @param {function(boolean, string, Object)} callback success, desc, result
 */
export function saveGame(data: SaveGameRequestData, callback: DAOCallback){
    const c = sql.columns.gameEntry;
    const columns_arr = [
        c.authorId,
        c.name, c.type, c.levelSwitch, 
        c.multiUserLimit, c.progressBoundType, 
        c.reportOptObjectives, 
        c.reportOptGuidanceTrg, 
        c.reportOptStudentUsage, 
        c.reportOptLevelScore,
        c.reportOptLevelTime
    ]
    const values = [
        data.author_id,
        data.name, data.type, data.level_switch,
        data.multi_user_limit, data.progress_bound_type,
        data.rep_opt_objectives,
        data.rep_opt_guidance_trg,
        data.rep_opt_student_usg,
        data.rep_opt_level_score,
        data.rep_opt_level_time,
        data.id,
    ]
    let columnsAndTemplate = columns_arr.map((v, i) => {
        return `${v} = ?`
    }).join(", ");

    const query = `UPDATE ${sql.tables.gameEntry} SET ${columnsAndTemplate} WHERE ${c.id} = ?`;

    /*
    console.log('editGame-query', JSON.stringify({
        sql: query,
        values: values
    }));*/

    // Update game_entry
    sql.getPool()!.query({
        sql: query,
        values: values,
    }, (err, res, fields) => {
        // console.log('editGame-res', JSON.stringify(res));
        console.log('editGame-err', JSON.stringify(err));
        if (err == null && typeof res == 'object' && res.affectedRows && res.affectedRows > 0){
            // callback(true, 'Successfully updated!', null);
            updateObjectives(data.id as string, data.objectives ?? [], (status) => {
                if (status){
                    updateTrackers(data.id, data.trackers ?? [], (status) => {
                        if (status){
                            callback(true, 'Successfully updated!', null);
                        }
                        else{
                            callback(false, 'Game & Objectives updated, failed to update trackers', null);
                        }
                    });
                }
                else{
                    callback(false, 'Game updated, failed to update objectives', null);
                }
            });
        }
        else{
            callback(false, 'Server Error', null);
        }
    });
}


/**
 * Retrieve game entry from the DB
 * @param {string | number} id 
 * @param {function(boolean, string, Object | null)} callback success?, desc, result
 */
export function getGame(id: string | number, callback: DAOCallback){
    sql.getPool()!.query({
        sql: "SELECT * FROM ?? WHERE ?? = ? LIMIT 1",
        values: [sql.tables.gameEntry, sql.columns.gameEntry.id, id]
    }, (err, res, fields) => {
        if (err == null && res.length > 0){

            const projectId = mongo.toObjectId(res[0][sql.columns.gameEntry.projectId]);

            mongo.Collections.getGameProjects().findOne(
                {_id: mongo.toObjectId(projectId)},
                (err, gameProject) => {
                    if (err){
                        callback(false, 'Error retrieving game project file', null);
                    }
                    else{
                        const result = {
                            entry: res[0],
                            project: gameProject!
                        }
                        callback(true, `Successfully retrieved game id ${id}`, result)
                    }
                }
            );
        }
        else if (err == null && res.length == 0){
            callback(false, `Could not find game matching ID, '${id}'`, null);
        }
        else{
            callback(false, "Server Error", null);
        }
    });
}


/**
 * Returns game entries
 * @param {boolean | null} isTemplate: 1 for templates, 0 for games. null for all.
 * @param {string | null} author user id of the entry owner
 * @param {function(boolean, string, Object} callback success, desc, object containing games
 */
export function getAllGames(isTemplate: boolean | null, author: string | null, callback: DAOCallback){
    const c = sql.columns.gameEntry;;
    let query = `SELECT * FROM ${sql.tables.gameEntry}`;
    let filters: string[] = [];

    if (isTemplate != null){
        filters.push(`${c.isTemplate} = ${isTemplate ? '1' : '0'}`);
    }

    if (author != null && author != ''){
        const eAuthor = sql.escape(author);
        filters.push(`${c.authorId} = ${eAuthor}`);
    }

    if (filters.length > 0){
        query = query + " WHERE " + filters.join(' AND ');
    }

    sql.getPool()!.query(query, (err, res, fields) => {

        if (err == null && typeof res == "object"){
            callback(true, `Succesfully received ${res.length} games`, res);
        }
        else{
            callback(false, JSON.stringify(err), null);
        }
    });
}

/**
 * Delete a game if it belongs to the provided userId.
 * @param {string} gameId 
 * @param {string} userId 
 * @param {function(boolean, string, Object): void} callback 
 */
export function deleteGame(gameId: string, userId: string, callback: DAOCallback){
    
    utils.checkUserCanModifyGame(gameId, userId, (status, projectId) => {
        if (!status){
            callback(false, 'User not allowed to delete this game', null);
            return;
        }
        deleteGameData(gameId, projectId!, (status, description, s) => {
            callback(status, description, null);
        });
    });
}

/**
 * Internal function to delete data related to a game.
 * 
 * Deletes the game entry, its project file and associated
 * resources in the file system.
 * @param {string} gameId 
 * @param {string} projectId
 * @param {function(boolean, string): void} callback 
 */
function deleteGameData(gameId: string, projectId: string, callback: DAOCallback){
    const t = sql.tables.gameEntry;
    const c = sql.columns.gameEntry;
    const deleteGameEntryQuery = `DELETE FROM ${t}
        WHERE ${c.id} = '${gameId}'
    `;

    // Delete game entry
    sql.getPool()!.query(deleteGameEntryQuery, (err, res, fields) => {
        if (err != null || err != undefined){
            l.logc(JSON.stringify(err), 'deleteGameData-err')
            callback(false, 'Delete operation failed for Game Entry', null);
            return;
        }

        // Find project file
        mongo.Collections.getGameProjects().findOne(
            {_id: mongo.toObjectId(projectId)},
            (err, doc) => {
                if (err || doc == null){
                    callback(false, 'Delete failed because project file does not exist', null);
                    return;
                }

                const resources = doc!['resources'] as Array<any>;

                // console.log("Document", JSON.stringify(doc), "resources", resources);

                mongo.Collections.getGameProjects().deleteOne(
                    {_id: mongo.toObjectId(projectId)},
                    (err) => {
                        if (err){
                            callback(false, 'Delete operation failed ' + JSON.stringify(err), null);
                            return;
                        }
        
                        // No resources, can go ahead and send response
                        if (resources.length == 0){
                            callback(true, 'Game Entry deleted successfully!', null);
                            return;
                        }
        
                        // Create promises for each delete process
                        const rootPath = utils.getRootPath();
                        let promises = new Array<Promise<void>>();
                        for (const resource of resources){
                            const filePath = rootPath + '/' + resource.filename;
                            promises.push(fsPromises.unlink(filePath));
                        }
        
                        console.log('To delete', resources.length, 'resources, awaiting on Promise.all with', promises.length, 'promises...');
        
                        // Execute all delete resource promises in union.
                        Promise.all(promises).finally(() => {
                            console.log('All delete resource promises resolved!');
                            callback(true, 'Game Entry deleted successfully!', null);
                        })
                    }
                )
            }
        )
    });
}

/**
 * Upload a FormData resource to the file system sent by frontend
 * @param {FormData} data Sent from Frontend
 * @param {File} file File object decoded by multer
 * @param {function(boolean, string, Object)} callback status, desc, new project
 */
export function uploadGameResource(requestBody: any, file: Express.Multer.File, callback: DAOCallback){
    // const fileName = file.filename
    // const path = file.path (base path + filename = path appropriate for storing in db)

    const mime = file.mimetype;
    const filePath = String(file.path);
    const projectId = String(requestBody.projectid);
    const projectIdAsObjectId = mongo.toObjectId(projectId);
    let fileType = mimeParse.findResourceTypeFromMimeType(mime);

    if (fileType == null){
        callback(false, `Unsupported mime type ${mime}`, null);
        return;
    }

    const displayName = file.originalname.split('/');
    const newResource = {
        _id: new ObjectId(),
        displayName: displayName[Math.max(displayName.length - 1, 0)],
        filename: filePath,
        type: fileType
    };

    mongo.Collections.getGameProjects().updateOne(
        { _id: projectIdAsObjectId},
        { $push: { resources: newResource } },
        (err, res) => {
            mongo.Collections.getGameProjects().findOne(
                {_id: projectIdAsObjectId},
                (err2, gameProject) => {
                    callback(true, 'OK', gameProject!);
                }
            )
        }
    );
}

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