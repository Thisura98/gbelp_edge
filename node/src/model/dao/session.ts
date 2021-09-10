import { GameSession, GameSessionState, GameSessionType } from '../../../../commons/src/models/session';
import * as sql from '../../util/connections/sql/sql_connection';

/**
 * INSERT a session row. Returns a promise with INSERT ID on success.
 */
export function createSession(
    typeId: number,
    state: number,
    gameEntryId: number,
    startTime: string,
    endTime: string | undefined,
    insertUserIds: [string] | undefined,
): Promise<string>{
    const c = sql.columns.gameSessions;
    const se = sql.smartEscape;
    const columns = [c.typeId, c.state, c.gameEntryId, c.startTime, c.endTime];
    const values = [se(typeId), se(state), se(gameEntryId), se(startTime), se(endTime)];

    const strColumns = columns.join(',')
    const strValues = values.join(',');
    
    const query = `INSERT INTO ${sql.tables.gameSessions}
    (${strColumns})
    VALUES (${strValues})`;

    // console.log(query);

    return new Promise<string>((resolve, reject) => {
        sql.getPool()!.query(query, (error, result) => {
            if (error){
                reject(error.message)
            }
            else{
                if (insertUserIds && insertUserIds.length > 0){
                    insertUsersToSession(
                        result.insertId,
                        insertUserIds
                    ).then(() => {
                        resolve(result.insertId);
                    }).catch((e) => {
                        reject(e);
                    })
                }
                else{
                    resolve(result.insertId);
                }
            }
        });
    });
}

/**
 * @param sessionId Session ID ID
 * @param userIds List of users (not csv, should be array)
 * @returns True if success. Promise error if failed.
 */
 export function insertUsersToSession(
    sessionId: string,
    userIds: [string]
): Promise<boolean>{
    const e = sql.escape;
    const valueTuples = userIds.map((uid) => {
        const values = [e(uid), e(sessionId)].join(',');
        return `(${values})`
    });

    const query = `INSERT IGNORE INTO ${sql.tables.gameSessionMembers}
    (${sql.columns.gameSessionMembers.userId}, ${sql.columns.gameSessionMembers.sessionId})
    VALUES ${valueTuples.join(',')}`;

    // console.log(query);

    return new Promise<boolean>((resolve, reject) => {
        sql.getPool()!.query(query, (error, result) => {
            if (error){
                reject(error.message)
            }
            else{
                resolve(true);
            }
        })
    });
}

/**
 * @param sessionId Session ID
 * @returns {any} DB row for the session
 */
export function getSession(sessionId: string): Promise<any>{
    const qGetSession = `SELECT * 
    FROM ${sql.tables.gameSessions} 
    WHERE ${sql.columns.gameSessions.sessionId} = '${sessionId}'
    `;

    return new Promise<any>((resolve, reject) => {
        sql.getPool()!.query(qGetSession, (error, result) => {
            if (error){
                reject(error.message);
            }
            else{
                resolve(result[0]);
            }
        });
    });
}

export function getSessionIdMatchingCriteria(
    userId: string, 
    gameId: string,
    sessionType: string,
    sessionState: string
): Promise<string | undefined>{
    const cSessions = sql.columns.gameSessions;
    const cSessionsMems = sql.columns.gameSessionMembers;

    const qExistingSession = `SELECT G.${cSessions.sessionId} 
    FROM \`${sql.tables.gameSessions}\` G 
    INNER JOIN \`${sql.tables.gameSessionMembers}\` M 
    ON G.${cSessions.sessionId} = M.${cSessionsMems.sessionId}
    WHERE M.${cSessionsMems.userId} = ${userId}
    AND G.${cSessions.typeId} = ${sessionType} 
    AND G.${cSessions.state} = ${sessionState}
    AND G.${cSessions.gameEntryId} = ${gameId}
    LIMIT 1;
    `;

    // console.log('getSessionIdMatchingCriteria', qExistingSession);

    return new Promise<string | undefined>((resolve, reject) => {
        sql.getPool()!.query(qExistingSession, (error, result) => {
            if (error){
                reject(error.message);
            }
            else{
                if (result.length > 0){
                    resolve(result[0][cSessions.sessionId]);
                }
                else{
                    resolve(undefined);
                }
            }
        });
    });
}

export function checkUserBelongsToSession(
    userId: string,
    sessionId: string
): Promise<boolean>{
    const tbl = sql.tables.gameSessionMembers;
    const cSessionId = sql.columns.gameSessionMembers.sessionId;
    const cUserId = sql.columns.gameSessionMembers.userId;
    const query = `
    SELECT COUNT(*) AS cnt 
    FROM \`${tbl}\` 
    WHERE ${cSessionId} = '${sessionId}' AND ${cUserId} = '${userId}';
    `;

    return new Promise<boolean>((resolve, reject) => {
        sql.getPool()!.query(query, (error, result) => {
            if (error)
                reject(error.message);
            else
                resolve(result[0].cnt > 0);
        });
    });
}