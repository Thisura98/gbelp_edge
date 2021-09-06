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
    const endTimeSafe: string | null = endTime == undefined ? 'null' : `'${endTime}''`;
    const values = [`'${typeId}''`, `'${state}''`, `'${startTime}'`, endTimeSafe];

    const strColumns = columns.join(',')
    const strValues = values.join(',');
    
    const query = `INSERT INTO ${sql.tables.gameSessions}
    (${strColumns})
    VALUES (${strValues})`;

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
 * Creates a new group with the details. Optionally 
 * adds the provided users to the group. Returns a promise
 * with the group id.
 * 
 * @param name Name of the Group
 */
export function createGroup(
    name: string,
    description: string,
    bannedUsersCSV: string,
    inviteLink: string | undefined,
    userLimit: string | undefined,
    userId: [string],
): Promise<string>{
    
}