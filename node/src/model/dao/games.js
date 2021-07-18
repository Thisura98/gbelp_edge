const l = require('../../util/logger');
const sql = require('../../util/connections/sql/sql_connection');
const mongo = require('../../util/connections/mongo/mongo_connection');
const { v4: uuidv4 } = require('uuid');
const { DateTime } = require('luxon');

/**
 * Create a game entry
 * @param {Object} data 
 * @param {function(boolean, string, Object)} callback success, desc, result
 */
function createGame(data, callback){
    const c = sql.columns.gameEntry;
    const columns_arr = [
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
    const columns = columns_arr.join(', ');
    const values = [
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
    const template = `${Array(columns_arr.length).fill('?')}`

    const query = `INSERT INTO ${sql.tables.gameEntry} (${columns}) VALUES (${template})`;

    l.logc(query, 'createGame-query');

    // create game entry in sql then,
    // create games document in mongo

    sql.getPool().query({
        sql: query,
        values: values
    }, (err, results, fields) => {
        
        // create games document in mongo 

        // const project = new mongo.models.

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
}

/**
 * Save Edited game entry
 * @param {Object} data 
 * @param {function(boolean, string, Object)} callback success, desc, result
 */
function editGame(data, callback){
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

    sql.getPool().query({
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
function getGame(id, callback){
    sql.getPool().query({
        sql: "SELECT * FROM ?? WHERE ?? = ? LIMIT 1",
        values: [sql.tables.gameEntry, sql.columns.gameEntry.id, id]
    }, (err, res, fields) => {
        if (err == null && res.length > 0){
            callback(true, `Successfully retrieved game id ${id}`, res[0])
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
function getAllGames(callback){
    const query = `SELECT * FROM ${sql.tables.gameEntry}`;
    sql.getPool().query(query, (err, res, fields) => {

        if (err == null && typeof res == "object"){
            callback(true, `Succesfully received ${res.length} games`, res);
        }
        else{
            callback(false, err, null);
        }
    });
}

/**
 * Upload a FormData resource to the file system sent by frontend
 * @param {FormData} data Sent from Frontend
 * @param {function(boolean, string)} callback 
 */
function uploadGameResource(data, callback){

}

module.exports.createGame = createGame;
module.exports.editGame = editGame;
module.exports.getGame = getGame;
module.exports.getAllGames = getAllGames;
module.exports.uploadGameResource = uploadGameResource;