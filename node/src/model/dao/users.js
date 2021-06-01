const l = require('../../util/logger');
const db = require('../../util/connections/sql_connection');
const { v4: uuidv4 } = require('uuid');
const { DateTime } = require('luxon');

/**
 * Create a User
 * @param {string} username 
 * @param {string} email 
 * @param {string} passwordHash 
 * @param {string} typeId 
 * @param {function(boolean):void} callback 
 */
function createUser(username, email, typeId, passwordHash, callback){
    db.query(
        'INSERT INTO ?? VALUES(0, ??, ??, ??, ??)', 
        [db.tables.users, username, email, typeId, passwordHash],
        (err, res, fields) => {
            l.logc(res, 'users');
            if (err){
                l.logc(err, 'users:createUser');
                callback(false);
            }
            else{
                callback(true);
            }
        }
    );
}

/**
 * Create User Auth Token and return it
 * @param {string} userId 
 * @param {function(boolean, string | null):void} callback 
 */
function createToken(userId, callback){
    const randomToken = uuidv4();
    const date = DateTime.now().plus({hours: 2});
    const dateFormatted = db.formatDate(date);

    db.query(
        'INSERT INTO ?? VALUES(0, ??, ??, ??)',
        [db.tables.userAuth, userId, randomToken, dateFormatted],
        (err, res, _) => {
            if (err){
                l.logc(err, 'users:createToken');
                callback(false, null)
            }
            else{
                l.logc(res, 'users:createToken');
                callback(true, randomToken);
            }
        }
    );
}