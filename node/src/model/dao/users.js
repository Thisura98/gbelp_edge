const l = require('../../util/logger');
const db = require('../../util/connections/sql_connection');
const { v4: uuidv4 } = require('uuid');
const { DateTime } = require('luxon');

/**
 * Returns the list of user types as an object array
 * @param {function():Object[]} callback 
 */
function getDisplayUserTypes(callback){
    db.getPool().query(
        'SELECT * FROM ?? WHERE ?? <> 1', [db.tables.userType, db.columns.userType.userTypeId],
        (err, res, fields) => {
            if (err){
                l.logc(err, 'users:getUserTypes');
            }
            else{
                // callback(db.mapResult(res, fields));
                callback(res);
            }
        }
    )
}

/**
 * Create a User
 * Callback receives status, reason, userId and token.
 * @param {String} username 
 * @param {String} email 
 * @param {String} passwordHash 
 * @param {String} typeId 
 * @param {function(Boolean, string|null, int|null, string|null):void} callback 
 */
function createUser(username, email, typeId, passwordHash, callback){
    db.getPool().getConnection((err, conn) => {
        // Check existing emails
        conn.query(
            'SELECT COUNT(*) AS count FROM ?? WHERE ?? = "??";',
            [db.tables.users, db.columns.users.userEmail, email],
            (err, res, fields) => {
                if (err){
                    l.logc(err, 'users:createUser:checkExistingEmail');
                    callback(false, null);
                }
                else{
                    if (res[0].count == 0){
                        conn.query(
                            'INSERT INTO ?? VALUES(0, ?, ?, ?, ?)', 
                            [db.tables.users, username, email, typeId, passwordHash],
                            (err, res, fields) => {
                                if (err){
                                    l.logc(err, 'users:createUser');
                                    callback(false, "Unexpected error occured");
                                }
                                else{
                                    const newUserId = res.insertId;

                                    createToken(newUserId, (status, token) => {
                                        if (status){
                                            callback(true, "", newUserId, token);
                                        }
                                        else{
                                            l.logc("retrieve token for new user failed", 'users:creatUser:getToken')
                                            callback(false, "Could not retrieve token");
                                        }
                                    });
                                }
                            }
                        );
                    }
                    else{
                        callback(false, "User already exists!")
                    }
                }
            }
        );
    });
}

/**
 * Create User Auth Token and return it
 * @param {String} userId 
 * @param {function(boolean, String | null):void} callback 
 */
function createToken(userId, callback){
    const randomToken = uuidv4();
    const date = DateTime.now().plus({hours: 2});
    const dateFormatted = db.formatDate(date);

    db.getPool().query(
        'INSERT INTO ?? VALUES(0, ?, ?, ?)',
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

/**
 * Checks whether a user & token match exists and is not expired.
 * 
 * @param {String} userId 
 * @param {String} token 
 * @param {function(Number):void} callback (-1: InvalidMissing, -2: InvalidExpired, 2: OK)
 */
function isTokenValidForUser(userId, token, callback){
    const credentialsOk = 2;
    const noMatch = -1;
    const expired = -2;

    const fromAndWhere = `FROM ${db.tables.userAuth}
     WHERE ${db.columns.userAuth.userId} = '${userId}' 
     AND ${db.columns.userAuth.authKey} = '${token}'`;
    
    db.getPool().query(`SELECT * ${fromAndWhere}`, (err, res, fields) => {
        if (err){
            l.logc(err, 'users:isTokenValidForUser');
            callback(-1);
        }
        else if (res && res.length > 0){
            const expiry = res[0].expiry_date;
            const expiryDate = DateTime.fromJSDate(expiry);
            const diff = expiryDate.diffNow('hours');
            if (diff.hours < 0.0){
                db.getPool().query(`DELETE ${fromAndWhere}`, (err, res, fields) => {
                    if (err)
                        l.logc(err, 'users:isTokenValidForUser:delToken');
                    callback(expired);
                });
            }
            else{
                callback(credentialsOk);
            }
        }
        else{
            callback(noMatch);
        }
    });
}


module.exports.getDisplayUserTypes = getDisplayUserTypes;
module.exports.createUser = createUser;
module.exports.createToken = createToken;
module.exports.isTokenValidForUser = isTokenValidForUser;