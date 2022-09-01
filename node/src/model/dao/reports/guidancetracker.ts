import { GameSessionUserGuidanceTracker } from '../../../../../commons/src/models/session/user.guidancetracker';
import * as sql from '../../../util/connections/sql/sql_connection';
import * as l from '../../../util/logger';

export function getUserGuidanceValues(sessionId: string): Promise<GameSessionUserGuidanceTracker[]> {

    const fn = 'getUserGuidanceValues';
    const table = sql.tables.gameSessionGuidanceTracker;
    const c = sql.columns.gameSessionGuidanceTracker;

    const query = `SELECT * FROM ${table}
    WHERE ${c.sessionId} = ?
    ORDER BY ${c.lastUpdated} ASC
    `;
    const values: string[] = [sessionId];

    return new Promise<GameSessionUserGuidanceTracker[]>((resolve, reject) => {
        sql.getPool()!.query(query, values, (err, result) => {
            if (err) {
                l.logc(err.message, fn)
                reject('Could not retrieve User Guidance Trackers');
            }
            else {
                resolve(result);
            }
        });
    });

}