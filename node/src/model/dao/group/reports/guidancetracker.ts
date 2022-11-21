import { GameSessionGuidanceBreakdown, ReportIntermediateGuidanceTrackerHitCounts } from '../../../../../../commons/src/models/reports/user.guidancetracker';
import { GameSessionUserGuidanceTracker } from '../../../../../../commons/src/models/session/user.guidancetracker';
import * as sql from '../../../../util/connections/sql/sql_connection';
import * as l from '../../../../Util/logger';

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

export function getTrackerHitCounts(sessionId: string)
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
    const query = `SELECT G.${G.name} as tracker_name, COALESCE(P.tracker_hit_count, 0) as tracker_hits
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

export function getTrackerBreakdown(sessionId: string): Promise<GameSessionGuidanceBreakdown[]>{

    const fn = 'getTrackerBreakdown';

    const userObjectives = sql.tables.gameSessionUserObjective;
    const userGuidanceTrackers = sql.tables.gameSessionGuidanceTracker;
    const gameObjectives = sql.tables.gameObjective;
    const gameGuidanceTrackers = sql.tables.gameGuidanceTracker;
    const users = sql.tables.users;

    const j = sql.columns.gameSessionUserObjective;
    const o = sql.columns.gameObjective;
    const u = sql.columns.users;
    const g = sql.columns.gameGuidanceTracker;
    const t = sql.columns.gameSessionGuidanceTracker;

    const values = [sessionId, sessionId, sessionId];
    const q = `
SELECT 
    M.${j.userId}, 
    U.${u.userName},
    ROUND( SUM(M.${j.progress}) / COUNT(M.${j.progress}), 4 ) as total_progress, 
    M2.total_play_duration, 
    COALESCE(M3.tracker_hit_count, 0) as tracker_hit_count,
    ROUND (
        COALESCE(M3.tracker_hit_count, 0) / ROUND( M2.total_play_duration, 4),
        4
    ) as velocity

/* Total Progress (M) */
FROM (
    SELECT 
        J.${j.userId}, 
        J.${j.objectiveId}, 
        MAX(J.${j.progress}) as max_progress, 
        O.${o.maxValue}, 
        ROUND(MAX(J.${j.progress}) / O.${o.maxValue}, 4) as progress
    FROM \`${userObjectives}\` J
    INNER JOIN \`${gameObjectives}\` O ON J.${j.objectiveId} = O.${o.objectiveId}
    WHERE J.${j.sessionId} = ?
    GROUP BY J.${j.userId}, J.${j.objectiveId}
) M

/* Total Play Duration (M2) */
INNER JOIN (
    SELECT J.${j.userId}, SUM(J.play_duration) as total_play_duration
    FROM (
        SELECT ${j.userId}, ${j.playNonce}, TIMESTAMPDIFF(SECOND, MIN(${j.lastUpdated}), MAX(${j.lastUpdated})) as play_duration
        FROM \`${userObjectives}\`
        WHERE ${j.sessionId} = ?
        GROUP BY ${j.userId}, ${j.playNonce}
    ) J
    GROUP BY J.${j.userId}
) M2 ON M.${j.userId} = M2.${j.userId}

/* Triggered Tracker Counts (M3) */
LEFT JOIN (
    SELECT T.${t.userId}, COUNT(T.${t.userId}) as tracker_hit_count
    FROM (
        SELECT T.${t.userId}, T.${t.trackerId}, COALESCE(MAX(T.${t.progress}), 0) as max_progress, G.${g.maxThreshold}
        FROM \`${userGuidanceTrackers}\` T
        INNER JOIN \`${gameGuidanceTrackers}\` G ON T.${t.trackerId} = G.${g.trackerId}
        WHERE T.${t.progress} >= ${g.maxThreshold} && T.${t.sessionId} = ?
        GROUP BY T.${t.userId}, T.${t.trackerId}
    ) T
    GROUP BY T.${t.userId}
) M3 ON M.${j.userId} = M3.${t.userId}

/* Users (U) */
INNER JOIN \`${users}\` U ON M.${j.userId} = U.${u.userId}

GROUP BY M.${j.userId};`;

    l.logc(q, fn);

    return new Promise<GameSessionGuidanceBreakdown[]>((resolve, reject) => {
        sql.getPool()!.query(q, values, (err, result) => {
            if (err) {
                l.logc(err.message, fn)
                reject('Could not retrieve User Game Tracker breakdown');
            }
            else {
                resolve(result);
            }
        });
    });

}