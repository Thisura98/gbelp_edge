import * as l from '../../util/logger';
import * as sql from '../../util/connections/sql/sql_connection';
import * as mongo from '../../util/connections/mongo/mongo_connection';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';
import * as mimeParse from '../../util/mime_parse';
import express from 'express';
import multer from 'multer';

/**
 * Create a game entry
 * @param {Object} data 
 * @param {function(boolean, string, Object)} callback success, desc, result
 */
export function createGame(data: any, callback: (status: boolean, desc: string, result: Object | null) => void){

    const c = sql.columns.gameEntry;
    let columns_arr = [
        c.id,
        c.authorId,
        c.name, c.type, c.levelSwitch, 
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
        data.name, data.type, data.level_switch,
        data.multi_user_limit, data.progress_bound_type,
        data.rep_opt_objectives,
        data.rep_opt_guidance_trg,
        data.rep_opt_student_usg,
        data.rep_opt_level_score,
        data.rep_opt_level_time
    ]

    // create game entry in sql,
    // then create games document in mongo

    const proj = new mongo.models.GameProject({ resources: [] });
    
    proj.save((mongo_error: any, document: any) => {
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
        const projectId = document._id.toString();

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
    }) 
}

/**
 * Save Edited game entry
 * @param {Object} data 
 * @param {function(boolean, string, Object)} callback success, desc, result
 */
export function editGame(data: any, callback: (status: boolean, desc: string, result: Object | null) => void){
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

    console.log('editGame-query', JSON.stringify({
        sql: query,
        values: values
    }));

    sql.getPool()!.query({
        sql: query,
        values: values,
    }, (err, res, fields) => {
        // console.log('editGame-res', JSON.stringify(res));
        console.log('editGame-err', JSON.stringify(err));
        if (err == null && typeof res == 'object' && res.affectedRows && res.affectedRows > 0){
            callback(true, 'Successfully updated!', null);
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
export function getGame(id: string | number, callback: (status: boolean, desc: string, result: Object | null) => void){
    sql.getPool()!.query({
        sql: "SELECT * FROM ?? WHERE ?? = ? LIMIT 1",
        values: [sql.tables.gameEntry, sql.columns.gameEntry.id, id]
    }, (err, res, fields) => {
        if (err == null && res.length > 0){

            const projectId = res[0][sql.columns.gameEntry.projectId];
            mongo.models.GameProject.findById(projectId, null, null, (err, gameProject) => {
                if (err){
                    callback(false, 'Error retrieving game project file', null);
                }
                else{
                    const result = {
                        entry: res[0],
                        project: gameProject
                    }
                    callback(true, `Successfully retrieved game id ${id}`, result)
                }
            })
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
 * Ret
 * @param {function(boolean, string, Object} callback success, desc, object containing games
 */
export function getAllGames(callback: (status: boolean, desc: string, result: Object | null) => void){
    const query = `SELECT * FROM ${sql.tables.gameEntry}`;
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
export function deleteGame(gameId: string, userId: string, callback: (status: boolean, desc: string, result: Object | null) => void){
    const t = sql.tables.gameEntry;
    const c = sql.columns.gameEntry;
    const selectAuthorsQuery = `SELECT ${c.authorId}, ${c.projectId} 
        FROM ${t} 
        WHERE ${c.id} = '${gameId}'
    `;

    sql.getPool()!.query(selectAuthorsQuery, (q1err, q1res, q1fields) => {
        if (q1err != null || typeof q1res != 'object' || q1res.length == 0){
            callback(false, 'Could not find Game Entry', null);
            return;
        }

        // csv of author ids - checked allowed to delete
        const authors = String(q1res[0][c.authorId]).split(',');

        console.log('deleteGame-delete', 'authors', JSON.stringify(authors), 'userId', userId);
        if (authors.find(a => a == userId) == undefined){
            callback(false, 'User not allowed to delete this game', null);
            return
        }

        // allowed to delete
        const projectId = q1res[0][c.projectId];
        deleteGameData(gameId, projectId, (status, description) => {
            callback(status, description, null);
        });
    })
}

/**
 * Internal function to delete data related to a game.
 * @param {string} gameId 
 * @param {string} projectId
 * @param {function(boolean, string): void} callback 
 */
function deleteGameData(gameId: string, projectId: string, callback: (status: boolean, desc: string) => void){
    const t = sql.tables.gameEntry;
    const c = sql.columns.gameEntry;
    const deleteGameEntryQuery = `DELETE FROM ${t}
        WHERE ${c.id} = '${gameId}'
    `;

    // Delete game entry
    sql.getPool()!.query(deleteGameEntryQuery, (err, res, fields) => {
        if (err != null || err != undefined){
            l.logc(JSON.stringify(err), 'deleteGameData-err')
            callback(false, 'Delete operation failed for Game Entry');
            return;
        }

        // Delete project file
        const GameProject = mongo.models.GameProject;
        GameProject.deleteOne({_id: projectId}, (err2) => {
            if (err2){
                callback(false, 'Delete operation failed for Game Project ' + JSON.stringify(err2));
                return
            }

            callback(true, 'Deleted Game Entry and Project Files');
        })
    });
}

/**
 * Upload a FormData resource to the file system sent by frontend
 * @param {FormData} data Sent from Frontend
 * @param {File} file File object decoded by multer
 * @param {function(boolean, string, Object)} callback status, desc, new project
 */
export function uploadGameResource(requestBody: any, file: Express.Multer.File, callback: (status: boolean, desc: string, result: Object | null) => void){
    // const fileName = file.filename
    // const path = file.path (base path + filename = path appropriate for storing in db)

    const mime = file.mimetype;
    const filePath = String(file.path);
    const projectId = String(requestBody.projectid);
    let fileType = mimeParse.findResourceTypeFromMimeType(mime);

    if (fileType == null){
        callback(false, `Unsupported mime type ${mime}`, null);
        return;
    }

    const newResource = {
        filename: filePath,
        type: fileType
    };

    mongo.models.GameProject.updateOne(
        { _id: projectId },
        { $push: { resources: newResource } },
        null, // no query options
        (err, res) => {
            mongo.models.GameProject.findById(projectId, (err2: any, gameProject: any) => {
                callback(true, 'OK', gameProject);
            });
        }
    );

    /*
    mongo.models.GameProject.findById(projectId, (err, gameProject) => {
        let resources = gameProject.resources;
        
        // resources.push(newResource);

        // gameProject.resources = resources;

        console.log('uploadGameResource-newGameProject!', JSON.stringify(err), JSON.stringify(gameProject))

        callback(true, 'OK');
    });*/
}

module.exports.createGame = createGame;
module.exports.editGame = editGame;
module.exports.getGame = getGame;
module.exports.getAllGames = getAllGames;
module.exports.uploadGameResource = uploadGameResource;
module.exports.deleteGame = deleteGame;