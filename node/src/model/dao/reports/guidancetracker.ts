import { ReportIntermediateGuidanceTrackerHitCounts } from '../../../../../commons/src/models/reports/user.guidancetracker';
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

export function getTrackerTriggerHits(sessionId: string)
    : Promise<ReportIntermediateGuidanceTrackerHitCounts[]>
{
    const fn = 'getUserGuidanceValues';
    const sessionGuidanceTracker = sql.tables.gameSessionGuidanceTracker;
    const gameGuidanceTracker = sql.tables.gameGuidanceTracker;
    const sessions = sql.tables.gameSessions;

    const T = sql.columns.gameSessionGuidanceTracker;
    const G = sql.columns.gameGuidanceTracker;
    const S = sql.columns.gameSessions;

    // Attempt 1:
    const query = `SELECT G.${G.name}, COALESCE(0, P.tracker_hit_count) as tracker_hit_count
FROM \`${gameGuidanceTracker}\` G 
LEFT JOIN (
    SELECT M.${T.trackerId}, COUNT(M.${T.trackerId}) as tracker_hit_count
    FROM (
        SELECT T.${T.playNonce}, T.${T.trackerId}, MAX(T.${T.progress}) as max_progress, G.${G.maxThreshold}
        FROM \`${sessionGuidanceTracker}\` T
        INNER JOIN \`${gameGuidanceTracker}\` G ON T.${T.trackerId} = G.${G.trackerId}
        WHERE T.${T.progress} >= ${G.maxThreshold} && T.${T.sessionId} = ?
        GROUP BY T.${T.playNonce}, T.${T.trackerId}
    ) M
    GROUP BY M.${T.trackerId}
) P ON G.${G.trackerId} = P.${T.trackerId}
WHERE G.${G.gameEntryId} IN (
    SELECT ${S.gameEntryId} FROM \`${sessions}\` WHERE ${S.sessionId} = ?
)`;
    const values = [sessionId, sessionId];

    // l.logc(query, fn);

    return new Promise<ReportIntermediateGuidanceTrackerHitCounts[]>((resolve, reject) => {
        sql.getPool()?.query(query, values, (err, result) => {
            if (err) {
                l.logc(err.message, fn)
                reject('Could not retrieve Guidance Tracker HitCount');
            }
            else {
                resolve(result);
            }
        })
    });
}