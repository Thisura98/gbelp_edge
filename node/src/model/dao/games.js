const l = require('../../util/logger');
const db = require('../../util/connections/sql_connection');
const { v4: uuidv4 } = require('uuid');
const { DateTime } = require('luxon');

/**
 * Create a game entry
 * @param {Object} data 
 * @param {function(boolean, string, Object)} callback success, desc, result
 */
function createGame(data, callback){
    const c = db.columns.gameEntry;
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

    const query = `INSERT INTO ${db.tables.gameEntry} (${columns}) VALUES (${template})`;

    l.logc(query, 'createGame-query');
    db.getPool().query({
        sql: query,
        values: values
    }, (err, results, fields) => {
        
        l.logc(JSON.stringify(err), 'createGame-err');
        l.logc(JSON.stringify(results), 'createGame-results');

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
 * Retrieve game entry from the DB
 * @param {string | number} id 
 * @param {function(boolean, string, Object | null)} callback success?, desc, result
 */
function getGame(id, callback){
    db.getPool().query({
        sql: "SELECT * FROM ?? WHERE ?? = ? LIMIT 1",
        values: [db.tables.gameEntry, db.columns.gameEntry.id, id]
    }, (err, res, fields) => {
        l.logc(JSON.stringify(err), 'getGame-err');
        l.logc(JSON.stringify(res), 'getGame-result', id);
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

module.exports.createGame = createGame;
module.exports.getGame = getGame;