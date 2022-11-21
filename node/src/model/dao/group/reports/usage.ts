import { GameSessionUserUsageBreakdown } from '../../../../../../commons/src/models/reports/user.usage';
import { GameSessionUserUsageGroupedByNonce } from '../../../../../../commons/src/models/reports/user.usage';
import * as sql from '../../../../Util/connections/sql/sql_connection';
import * as l from '../../../../Util/logger';

export function getUserUsageGroupedByNonce(sessionId: string): Promise<GameSessionUserUsageGroupedByNonce[]>{
    const fn = 'getUserUsage';
    const table = sql.tables.gameSessionUsage;
    const c = sql.columns.gameSessionUsage;
    const query = `SELECT ${c.playNonce}, MIN(${c.userId}) AS user_id, MIN(${c.sessionId}) AS session_id, 
        MIN(${c.timestamp}) AS start_time,
        MAX(${c.timestamp}) AS end_time
        FROM ${table} 
        WHERE ${c.sessionId} = ? 
        GROUP BY ${c.playNonce}
        ORDER BY start_time ASC`;
    const values: string[] = [sessionId];

    // l.logc(query, 'usage-data-bynonce-query');

    return new Promise<GameSessionUserUsageGroupedByNonce[]>((resolve, reject) => {
        sql.getPool()!.query(query, values, (error, result) => {
            if (error){
                l.logc(error.message, fn);
                reject('Could not retrieve user usage data');
            }
            else{
                resolve(result);
            }
        });
    });
}

/**
 * Get user usage breakdown table. Optionally accepts
 * start & end timestamps
 * @param sessionId Game Session ID
 * @param startTimestamp Timestamp in SECONDS
 * @param endTimestamp Timestamp in SECONDS
 */
export function getUserUsageBreakdown(
    sessionId: string,
    startTimestamp: string,
    endTimestamp: string
): Promise<GameSessionUserUsageBreakdown[]>{

    const fn = 'getUserUsageBreakdown';
    const blank = '';
    const usageTable = sql.tables.gameSessionUsage;
    const userTable = sql.tables.users;
    const k = sql.columns.gameSessionUsage;
    const u = sql.columns.users;

    let values = [sessionId];
    let internalWhere = `WHERE ${k.sessionId} = ?`;
    let whereParts: string[] = [];

    if (startTimestamp != blank){
        // whereParts.push(`(${k.isStart} = 1 AND ${k.timestamp} > FROM_UNIXTIME(?))`);
        whereParts.push(`(${k.timestamp} > FROM_UNIXTIME(?))`);
        values.push(startTimestamp!);
    }

    if (endTimestamp != blank){
        // whereParts.push(`(${k.isStart} = 0 AND ${k.timestamp} < FROM_UNIXTIME(?))`);
        whereParts.push(`(${k.timestamp} < FROM_UNIXTIME(?))`);
        values.push(endTimestamp!);
    }

    if (whereParts.length > 0){
        internalWhere = 
        `${internalWhere}
            AND (
                ${whereParts.join('\AND\n')}
            )
        `;
    }

    let internalQuery = 
    `SELECT 
        ${k.userId}, 
        TIMESTAMPDIFF(SECOND, MIN(${k.timestamp}), MAX(${k.timestamp})) as duration
    FROM ${usageTable}
    ${internalWhere}
    GROUP BY ${k.userId}, ${k.playNonce}
    ORDER BY duration DESC
    `;

    const mainQuery = 
    `SELECT 
        U.${u.userId}, U.${u.userName}, 
        MAX(K.duration) as max_usage,  
        AVG(K.duration) as avg_usage,
        COUNT(K.${k.userId}) as session_count
    FROM (
        ${internalQuery}
    ) AS K
    INNER JOIN ${userTable} U ON K.${k.userId} = U.${u.userId}
    GROUP BY K.${k.userId}
    `;

    // l.logc(mainQuery, fn);

    return new Promise<GameSessionUserUsageBreakdown[]>((resolve, reject) => {
        sql.getPool()?.query(mainQuery, values, (error, result) => {
            if (error){
                l.logc(error.message, fn);
                reject('Could not retrieve user usage data');
            }
            else{
                resolve(result);
            }
        });
    });
}