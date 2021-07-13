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

module.exports.createGame = createGame;