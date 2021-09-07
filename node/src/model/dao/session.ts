import * as sql from '../../util/connections/sql/sql_connection';

/**
 * INSERT a session row. Returns a promise with INSERT ID on success.
 */
export function createSession(
    typeId: number,
    state: number,
    startTime: string,
    endTime: string | undefined
): Promise<string>{
    const c = sql.columns.gameSessions;
    const columns = [c.typeId, c.state, c.startTime, c.endTime];
    const endTimeSafe = sql.smartEscape(endTime);
    const values = [`'${typeId}'`, `'${state}'`, `'${startTime}'`, endTimeSafe];

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
                resolve(result.insertId);
            }
        });
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