import { GameSession, GameSessionWithExtensions } from '../../../../commons/src/models/session';
import * as groupsDAO from './group/index';
import * as sql from '../../Util/connections/sql/sql_connection';
import * as l from '../../Util/logger';

/**
 * INSERT a session row. Returns a promise with INSERT ID on success.
 */
export function createSession(
    typeId: number,
    state: number,
    gameEntryId: number,
    groupId: number,
    startTime: string,
    endTime: string | undefined,
    insertUserIds: string[] | undefined,
): Promise<string>{
    const c = sql.columns.gameSessions;
    const se = sql.smartEscape;
    const columns = [c.typeId, c.state, c.gameEntryId, c.groupId, c.startTime, c.endTime];
    const values = [se(typeId), se(state), se(gameEntryId), se(groupId), se(startTime), se(endTime)];

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
    userIds: string[]
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
    sessionState: string,
    groupId: string | undefined = undefined
): Promise<string | undefined>{
    const cSessions = sql.columns.gameSessions;
    const cSessionsMems = sql.columns.gameSessionMembers;

    let values: string[] = [userId, sessionType, sessionState, gameId];
    let qExistingSession = `SELECT G.${cSessions.sessionId} 
    FROM \`${sql.tables.gameSessions}\` G 
    INNER JOIN \`${sql.tables.gameSessionMembers}\` M 
    ON G.${cSessions.sessionId} = M.${cSessionsMems.sessionId}
    WHERE M.${cSessionsMems.userId} = ?
    AND G.${cSessions.typeId} = ?
    AND G.${cSessions.state} = ?
    AND G.${cSessions.gameEntryId} = ?
    `;

    if (groupId != undefined && groupId != ''){
        qExistingSession += `
        AND G.${cSessions.groupId} = ?
        `;
        values.push(groupId!);
    }

    qExistingSession += ' LIMIT 1;';

    // console.log('getSessionIdMatchingCriteria', qExistingSession);

    return new Promise<string | undefined>((resolve, reject) => {
        sql.getPool()!.query(qExistingSession, values, (error, result) => {
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
    const query = `SELECT COUNT(*) AS cnt 
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

export function getMembersInSession(
    sessionId: string
): Promise<string[]>{
    const eSID = sql.smartEscape(sessionId);
    const query = `SELECT user_id FROM gsession_members WHERE session_id = ${eSID};`;
    return new Promise<string[]>((resolve, reject) => {
        sql.getPool()!.query(query, (error, result) => {
            if (error){
                l.logc(error.message, 'getMembersInSession');
                reject(error.message)
            }
            else{
                const arr = (result as Array<any>);
                const mapped = arr.map(v => v['user_id'] as string);
                resolve(mapped);
            }
        })
    })
}

/**
 * @param states An ARRAY of session states to filter with. If empty, returns sessions with all states.
 * @returns 
 */
export function getSessionsInGroup(
    groupId: string,
    states: string[],
): Promise<GameSessionWithExtensions[]>{
    const t = sql.tables.gameSessions;
    const t2 = sql.tables.gameEntry;
    const t3 = sql.tables.userGroup;
    const c = sql.columns.gameSessions;
    const c2 = sql.columns.gameEntry;
    const c3 = sql.columns.userGroup;
    const se = sql.smartEscape;
    let query = `SELECT S.*, E.type as game_type, E.name as game_entry_name, G.${c3.name} as group_name
    FROM \`${t}\` S
    INNER JOIN \`${t2}\` E ON S.${c.gameEntryId} = E.${c2.id}
    INNER JOIN \`${t3}\` G ON G.${c3.groupId} = S.${c.groupId}
    WHERE S.${c.groupId} = ${se(groupId)}
    `;

    if (states.length > 0){
        const joint = '(' + states.join(',') + ')';
        query += ` AND S.${c.state} IN ${joint}`;
    }

    return new Promise<GameSessionWithExtensions[]>((resolve, reject) => {
        sql.getPool()!.query(query, (error, result) => {
            if (error){
                l.logc(error.message, "getSessionsInGroup");
                reject(error.message);
            }
            else{
                resolve(result);
            }
        });
    });
}

export function modifySession(
    sessionId: number,
    typeId: number,
    state: number,
    gameEntryId: number,
    groupId: number,
    startTime: string,
    endTime: string | undefined
): Promise<void>{

    const c = sql.columns.gameSessions;
    const se = sql.smartEscape;
    const columns = [
        c.sessionId, c.typeId, c.state, c.gameEntryId, 
        c.groupId, c.startTime, c.endTime
    ];
    const values = [
        se(sessionId), se(typeId), se(state), se(gameEntryId), 
        se(groupId), se(startTime), se(endTime)
    ];

    const assignments = columns.map((column, i) => {
        return `${column} = ${values[i]}`
    });
    const strAssignments = assignments.join(', ');
    
    const query = 
`UPDATE ${sql.tables.gameSessions} 
SET ${strAssignments} 
WHERE ${c.sessionId} = ${values[0]}`;

    return new Promise((resolve, reject) => {
        sql.getPool()!.query(query, (err, result) => {
            if (err){
                l.logc(String(err), 'modifySession()');
                reject('Could not modify session');
            }
            else{
                resolve();
            }
        })
    });

}

export function getAllSessionsForUser(
    userId: string
): Promise<GameSessionWithExtensions>{

    const tag = 'getAllSessionsForUser';
    const sessions = sql.tables.gameSessions;
    const games = sql.tables.gameEntry;
    const group = sql.tables.userGroup;
    const groupMembership = sql.tables.userGroupMembership;

    const s = sql.columns.gameSessions;
    const ge = sql.columns.gameEntry;
    const gr = sql.columns.userGroup;
    const gm = sql.columns.userGroupMembership;

    const values = [userId];
    const query = 
`SELECT S.*, GE.${ge.type} as game_type, GE.${ge.name} as game_entry_name, GR.${gr.name} as group_name
FROM ${sessions} S 
INNER JOIN ${groupMembership} GM ON GM.${gm.groupId} = S.${s.groupId}
INNER JOIN ${games} GE ON GE.${ge.id} = S.${s.gameEntryId}
INNER JOIN ${group} GR ON GR.${gr.groupId} = S.${s.groupId}
WHERE GM.${gm.userId} = ?
`;

    return new Promise<GameSessionWithExtensions>((resolve, reject) => {
        sql.getPool()?.query(query, values, (err, results) => {
            if (err){
                l.logc(String(err), tag);
                reject('Could not get all sessions for user');
            }
            else{
                resolve(results);
            }
        });
    });
}