import * as l from '../../../Util/logger';
import * as db from '../../../util/connections/sql/sql_connection';
import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';

export interface ICreateUserResult{
    user_id: string
    user_name: string
    user_type_name: string
    user_type_id: string
    token: string | null
}

/**
 * Returns the list of user types as an object array
 * @param {function():Object[]} callback 
 */
export function getDisplayUserTypes(callback: (result: Object) => void){
    db.getPool()!.query(
        'SELECT * FROM ?? WHERE ?? <> 1', [db.tables.userType, db.columns.userType.userTypeId],
        (err, res, fields) => {
            if (err){
                l.logc(err.message, 'users:getUserTypes');
            }
            else{
                // callback(db.mapResult(res, fields));
                callback(res);
            }
        }
    )
}

/**
 * Finds and returns the user
 * @param {String} userId 
 * @param {function(boolean, Object|null):void} callback 
 */
export function getUser(userId: string, callback: (status: boolean, result: Object | null) => void){
    db.getPool()!.query(
        'SELECT * FROM ? WHERE ?? = ?',
        [db.tables.users, db.columns.users.userId, userId],
        (err, res, fields) => {
            if (err){
                l.logc(err.message, 'getUser');
                callback(false, null);
            }
            else{
                callback(true, db.mapResult(res, fields));
            }
        }
    )
}

/**
 * Returns the user type object
 * @param {String} userId 
 * @param {function(boolean, string, object|null):void} callback 
 */
export function getUserType(userId: string, callback: (status: boolean, desc: string, result: Object | null) => void){
    db.getPool()!.query(
        `SELECT T.${db.columns.userType.userTypeId} as user_type_id, T.${db.columns.userType.name} as name
         FROM ${db.tables.users} U INNER JOIN ${db.tables.userType} T 
         ON U.${db.columns.users.userType} = T.${db.columns.userType.userTypeId} 
         WHERE U.${db.columns.users.userId} = '${userId}'`,
        (err, res, fields) => {
            if (err){
                l.logc(err.message, 'getUser');
                callback(false, "Server Error", null);
            }
            else{
                if (res.length == 0){
                    callback(false, "Could not find user", null);
                }
                else{
                    callback(true, "", res[0]);
                }
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
 * @param {function(Boolean, string|null, ICreateUserResult|null):void} callback 
 */
export function createUser(
    username: string, email: string, typeId: string, passwordHash: string, 
    callback: (status: boolean, message: string | null, result: ICreateUserResult | null) => void
){
    db.getPool()!.getConnection((err, conn) => {

        let invokeCallback: (st: boolean, msg: string | null, res: ICreateUserResult | null) => void = (st, msg, res) => { 
            conn.release();
            callback(st, msg, res);
        }

        // Check existing emails
        conn.query(
            'SELECT COUNT(*) AS count FROM ?? WHERE ?? = "??";',
            [db.tables.users, db.columns.users.userEmail, email],
            (err, res, fields) => {
                if (err){
                    l.logc(err.message, 'users:createUser:checkExistingEmail');
                    invokeCallback(false, null, null);
                }
                else{
                    if (res[0].count == 0){
                        conn.query(
                            'INSERT INTO ?? VALUES(0, ?, ?, ?, ?)', 
                            [db.tables.users, username, email, typeId, passwordHash],
                            (err, res, fields) => {
                                if (err){
                                    l.logc(err.message, 'users:createUser');
                                    invokeCallback(false, "Unexpected error occured", null);
                                }
                                else{
                                    const newUserId = res.insertId;

                                    conn.query(
                                        `SELECT * FROM ${db.tables.userType} WHERE ${db.columns.userType.userTypeId} = ${typeId}`,
                                        (err, res, fields) => {

                                        createToken(newUserId, (status, token) => {

                                            const userAndToken: ICreateUserResult = {
                                                user_id: newUserId,
                                                user_name: username,
                                                user_type_name: res[0][db.columns.userType.name],
                                                user_type_id: typeId,
                                                token: token
                                            };

                                            if (status){
                                                invokeCallback(true, "", userAndToken);
                                            }
                                            else{
                                                l.logc("retrieve token for new user failed", 'users:creatUser:getToken')
                                                invokeCallback(false, "Could not retrieve token", null);
                                            }
                                        });


                                    });
                                }
                            }
                        );
                    }
                    else{
                        invokeCallback(false, "User already exists!", null)
                    }
                }
            }
        );
    });
}

/**
 * Logins in a user if userEmail and password hashes match.
 * Returns status, message, id and token.
 * @param {string} userEmail 
 * @param {string} pwHash 
 * @param {function(boolean, string|null, object|null):void} callback 
 */
export function loginUser(
    userEmail: string, 
    pwHash: string, 
    callback: (status: boolean, desc: string | null, result: Object | null) => void
){

    const U = db.columns.users;
    const T = db.columns.userType;
    const query = `
        SELECT U.${U.userId} AS user_id, U.${U.userName} AS user_name, T.${T.name} AS user_type_name, U.${U.userType} AS user_type_id
        FROM ${db.tables.users} U 
        INNER JOIN ${db.tables.userType} T 
        ON U.${U.userType} = T.${T.userTypeId}
        WHERE LOWER(${U.userEmail}) = LOWER('${userEmail}')
        AND LOWER(${U.userPasswordHash}) = LOWER('${pwHash}')
    `;

    db.getPool()!.query(
        query,
        (err, res, fields) => {
            if (err){
                l.logc(err.message, 'loginUser');
                callback(false, null, null);
            }
            else{
                if (res.length > 0 && res[0].user_id !== undefined){
                    const userId = res[0].user_id;
                    createToken(userId, (status, token) => {
                        if (status){
                            const userAndToken = {
                                user_id: userId,
                                user_name: res[0].user_name,
                                user_type_name: res[0].user_type_name,
                                user_type_id: res[0].user_type_id,
                                token: token
                            };
                            callback(true, "Success!", userAndToken);
                        }
                        else{
                            callback(false, "Could not retrieve token", null);
                        }
                    });
                }
                else{
                    const msg = `User with email, "${userEmail}" was not found. Please register or try correcting your email address`;
                    callback(false, msg, null);
                }
            }
        }
    )
}

/**
 * Create User Auth Token and return it
 * @param {String} userId 
 * @param {function(boolean, String | null):void} callback 
 */
export function createToken(userId: string, callback: (status: boolean, desc: string | null) => void){
    const randomToken = uuid();
    const date = DateTime.now().plus({hours: 2});
    const dateFormatted = db.formatDate(date);

    db.getPool()!.query(
        'INSERT INTO ?? VALUES(0, ?, ?, ?)',
        [db.tables.userAuth, userId, randomToken, dateFormatted],
        (err, res, _) => {
            if (err){
                l.logc(err.message, 'users:createToken');
                callback(false, null)
            }
            else{
                // l.logc('insert ID = ' + res.insertId, 'users:createToken');
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
export function isTokenValidForUser(userId: string, token: string, callback: (status: number) => void){
    const credentialsOk = 2;
    const noMatch = -1;
    const expired = -2;

    const fromAndWhere = `FROM ${db.tables.userAuth}
     WHERE ${db.columns.userAuth.userId} = '${userId}' 
     AND ${db.columns.userAuth.authKey} = '${token}'`;
    
    db.getPool()!.query(`SELECT * ${fromAndWhere}`, (err, res, fields) => {
        if (err){
            l.logc(err.message, 'users:isTokenValidForUser');
            callback(-1);
        }
        else if (res && res.length > 0){
            const expiry = res[0].expiry_date;
            const expiryDate = DateTime.fromSQL(expiry);
            const diff = expiryDate.diffNow('hours');
            if (diff.hours <= 0.0){
                db.getPool()!.query(`DELETE ${fromAndWhere}`, (err, res, fields) => {
                    if (err)
                        l.logc(err.message, 'users:isTokenValidForUser:delToken');
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

/**
 * Checks if the user is one of specified typeIds.
 */
export function checkUserType(
    userId: string,
    typeIds: string[],
): Promise<boolean>{
    const tbl = db.tables.users;
    const c = db.columns.users;
    const se = db.smartEscape;

    const typeChecks = typeIds.map(id => {
        return `(${c.userType} = ${se(id)})`
    });
    const mergedTypeChecks = '(' + typeChecks.join(' OR ') + ')';

    const query = `SELECT COUNT(*) as user_count
    FROM \`${tbl}\`
    WHERE ${c.userId} = ${se(userId)}
    AND ${mergedTypeChecks}`;

    return new Promise((resolve, reject) => {
        db.getPool()!.query(query, (error, result) => {
            if (error){
                reject('checkUserType ' + error.message);
            }
            else{
                const count = Number.parseInt(result[0].user_count);
                resolve(count > 0);
            }
        });
    });
}