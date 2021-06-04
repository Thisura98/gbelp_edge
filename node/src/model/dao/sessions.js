const l = require('../../util/logger');
const db = require('../../util/connections/sql_connection');
const { v4: uuidv4 } = require('uuid');
const { DateTime } = require('luxon');

/**
 * Get the latest session object for the provided user
 * Returns status, description and object
 * @param {String} userId 
 * @param {function(boolean, String, object|null):void} callback 
 */
function getLatestSessionForUser(userId, callback){
    db.getPool().query(
        `SELECT S.${db.columns.gameSessions.startTime},S.${db.columns.gameSessions.endTime}
         FROM ${db.tables.gameSessions} S
         INNER JOIN ${db.tables.gameSessionMembers} M
         ON S.${db.columns.gameSessions.sessionId} = M.${db.columns.gameSessionMembers.sessionId}
         WHERE M.${db.columns.gameSessionMembers.userId} = '${userId}'
         LIMIT 1;`,
        (err, res, fields) => {
            if (err){
                l.logc(err, 'sessions:getLatest(1)');
                callback(false, 'Could not get sessions', null);
            }
            else{
                if (res.length == 0){
                    l.logc(err, 'sessions:getLatest(2)');
                    callback(false, 'Could not get sessions', null);
                }
                else{
                    callback(true, '', res[0]);
                }
            }
        }
    );
}

/**
 * Gets the total set of game histories.
 * Returns status, description and object array
 * @param {String} userId 
 * @param {String} sessionId 
 * @param {function(boolean, string, object[]|null):void} callback 
 */
function getGameObjectiveHistories(userId, sessionId, callback){

    const tbl = db.tables.gameSessionUserObjective;
    const col = db.columns.gameSessionUserObjective;

    db.getPool().query(
        `SELECT * FROM ${tbl}
         WHERE ${col.sessionId} = '${sessionId}'
         AND ${col.userId} = '${userId}';
        `,
        (err, res, _) => {
            if (err){
                l.logc(err, 'sessions:getObjectivesHistory(1)');
                callback(false, 'Could not get histories', null);
            }
            else{
                if (res.length == 0){
                    l.logc(err, 'sessions:getObjectivesHistory(2)');
                    callback(false, 'Could not get histories', null);
                }
                else{
                    callback(true, '', res);
                }
            }
        }
    )
}

/**
 * Inserts an item to the objective history
 * Returns status and description
 * @param {String} userId 
 * @param {String} sessionId 
 * @param {String} objectiveId 
 * @param {Double} progress 
 * @param {function(boolean, String):void} callback 
 */
function addGameObjectiveHistory(userId, sessionId, objectiveId, progress, callback){
    const tbl = db.tables.gameSessionUserObjective;
    const now = DateTime.now().toFormat(`yyyy-MM-dd'T'HH:mm:ss`);
    console.log([tbl, sessionId, objectiveId, userId, progress, now]);
    db.getPool().query(
        `INSERT INTO ?? VALUES (?, ?, ?, ?, ?);`,
        [tbl, sessionId, objectiveId, userId, progress, now],
        (err, res, _) => {
            if (err){
                l.logc(err, 'sessions:addObjectivesHistory(1)');
                callback(false, 'Could not add history', null);
            }
            else{
                callback(true, 'Success!', res);
            }
        }
    )
}

/**
 * Clear all objective histories for a user
 * @param {string} userId 
 * @param {function(boolean, string|null):void} callback 
 */
function clearGameObjectiveHistories(userId, callback){
    db.getPool().query(
        `DELETE FROM ${db.tables.gameSessionUserObjective}
         WHERE ${db.columns.gameSessionUserObjective.userId} = '${userId}'`,
        (err, res, _) => {
            if (err){
                l.logc(err, 'clearObjectiveHistories');
                callback(false, 'Error occured');
            }
            else{
                callback(true, '');
            }
        }
    )
}

module.exports.getLatestSessionForUser = getLatestSessionForUser;
module.exports.getGameObjectiveHistories = getGameObjectiveHistories;
module.exports.addGameObjectiveHistory = addGameObjectiveHistory;
module.exports.clearGameObjectiveHistories = clearGameObjectiveHistories;