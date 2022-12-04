import * as l from '../../../Util/logger';
import * as sql from '../../../Util/connections/sql/sql_connection';
import * as mongo from '../../../Util/connections/mongo/mongo_connection';
import * as utils from '../../../Util/utils';
import { v4 as uuidv4 } from 'uuid';
import { DateTime, ToSQLOptions } from 'luxon';
import * as mimeParse from '../../../Util/mime_parse';
import fsPromises from 'fs/promises';
import { GameListing, GameType, kGameEntryParentEntryIdNone, SaveGameRequestData } from '../../../../../commons/src/models/game/game';
import * as LevelInitData from '../../../../../commons/src/models/game/levels/initdata';
import DAOCallback, { DAOTypedCallback } from '../commons';
import * as metricsDAO from '../metrics'
import { GameProject } from '../../../../../commons/src/models/game/project';
import { createTemplate } from './template.helper';
import { cloneTemplateAndCreateNewRecord } from './clone.helper';

/**
 * @returns Convert game entry request into columns : values of a SQL query
 */
export function convertGameRequestDataToQueryMap(data: SaveGameRequestData): { [key: string]: any } {
    const c = sql.columns.gameEntry;

    let m: { [key: string]: any } = {};
    m[c.id] = 0; 
    m[c.authorId] = data.author_id; 
    m[c.name] = data.name; 
    m[c.type] = data.type; 
    m[c.isTemplate] = data.is_template; 
    m[c.isPublished] = data.is_published; 
    m[c.parentEntryId] = data.parent_entry_id; 
    m[c.levelSwitch] = data.level_switch; 
    m[c.multiUserLimit] = data.multi_user_limit; 
    m[c.progressBoundType] = data.progress_bound_type; 
    m[c.reportOptObjectives] = data.rep_opt_objectives; 
    m[c.reportOptGuidanceTrg] = data.rep_opt_guidance_trg; 
    m[c.reportOptStudentUsage] = data.rep_opt_student_usg; 
    m[c.reportOptLevelScore] = data.rep_opt_level_score; 
    m[c.reportOptLevelTime] = data.rep_opt_level_time; 

    if (m[c.parentEntryId] == kGameEntryParentEntryIdNone)
        m[c.parentEntryId] = null;

    return m;
}

/**
 * Create a game entry
 * @param {Object} data 
 * @param {function(boolean, string, Object)} callback success, desc, result
 */
export function createGame(data: SaveGameRequestData, callback: DAOCallback){

    const m = convertGameRequestDataToQueryMap(data);

    // create game entry in sql,
    // then create games document in mongo

    if (data.is_template){
        createTemplate(data, m)
        .then(templateId => {
            let response = {
                gameId: templateId
            };
            callback(true, 'Successfully created Template!', response);
        })
        .catch(err => {
            callback(false, err, null);
        })
    }
    else{
        cloneTemplateAndCreateNewRecord(data.parent_entry_id!, m)
        .then(gameId => {
            let res = { gameId: gameId };
            callback(true, 'Successfully created Game!', res);
        })
        .catch(err => {
            callback(false, err, null);
        })
    }
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
        c.isPublished,
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
        data.is_published,
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
            metricsDAO.updateObjectives(data.id as string, data.objectives ?? [], (status) => {
                if (status){
                    metricsDAO.updateTrackers(data.id, data.trackers ?? [], (status) => {
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
 * Retrieve game entry & project from the DB in one call
 * @param {string | number} id 
 * @param {function(boolean, string, GameListing | null)} callback success?, desc, result
 */
export function getGame(id: string | number, callback: DAOTypedCallback<GameListing>){
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
                        const result: GameListing = {
                            entry: res[0],
                            project: gameProject! as GameProject
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
 * @param {boolean | null} isPublished: 1 for published, 0 for unpublished, null for all
 * @param {string | null} author user id of the entry owner
 * @param {function(boolean, string, Object} callback success, desc, object containing games
 */
export function getAllGames(isTemplate: boolean | null, isPublished: boolean | null, author: string | null, callback: DAOCallback){
    const c = sql.columns.gameEntry;;
    let query = `SELECT * FROM ${sql.tables.gameEntry}`;
    let filters: string[] = [];

    if (isTemplate != null){
        filters.push(`${c.isTemplate} = ${isTemplate ? '1' : '0'}`);
    }

    if (isPublished != null){
        filters.push(`${c.isPublished} = ${isPublished ? '1' : '0'}`);
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

// MARK: Reexports (re-exports) from helper classes

export { uploadGameResource } from './uploadres.helper';

export { deleteGameResource } from './delres.helper';

export { duplicateGameOrTemplateEntry } from './duplicate.helper';

// MARK: End re-exports

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