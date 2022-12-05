import { GameSessionUserObjectiveBreakdown, ReportIntermediateObjectiveCompletionProgress } from '../../../../../../commons/src/models/reports/user.objective';
import { GameSessionUserObjective } from '../../../../../../commons/src/models/session/user.objective';
import * as sql from '../../../../Util/connections/sql/sql_connection';
import * as l from '../../../../Util/logger';

export function getUserObjectiveProgress(sessionId: string): Promise<GameSessionUserObjective[]> {

    const fn = 'getUserObjectiveProgress';
    const table = sql.tables.gameSessionUserObjective;
    const c = sql.columns.gameSessionUserObjective;

    const query = `SELECT * FROM ${table}
    WHERE ${c.sessionId} = ?
    ORDER BY ${c.lastUpdated} ASC
    `;
    const values: string[] = [sessionId];

    return new Promise<GameSessionUserObjective[]>((resolve, reject) => {
        sql.getPool()!.query(query, values, (err, result) => {
            if (err) {
                l.logc(err.message, fn)
                reject('Could not retrieve User Objectives');
            }
            else {
                resolve(result);
            }
        });
    });

}

export function getUserObjectiveProgressByCompletion(sessionId: string): Promise<ReportIntermediateObjectiveCompletionProgress[]> {

    const fn = 'getUserObjectiveProgressByCompletion';
    const userObjectives = sql.tables.gameSessionUserObjective;
    const gameObjectives = sql.tables.gameObjective;
    const sessionMembers = sql.tables.gameSessionMembers;
    const j = sql.columns.gameSessionUserObjective;
    const o = sql.columns.gameObjective;
    const j2 = sql.columns.gameSessionMembers;

    const query = `SELECT 
        J2.${j.objectiveId} as objective_id, 
        J2.${o.name} as objective_name,
        SUM(J2.progress) as progress_sum, 
        COUNT(J2.progress) as users, 
        ROUND( SUM(J2.progress) / COUNT(J2.progress), 4 ) as objective_progress
    FROM (
        SELECT 
            J.${j.userId}, 
            J.${j.objectiveId},
            O.${o.name}, 
            J.max_user_progress, 
            O.${o.maxValue}, 
            ROUND((J.max_user_progress / O.${o.maxValue}), 4) as progress
        FROM (
            SELECT ${j.userId}, ${j.objectiveId}, MAX(${j.progress}) as max_user_progress
            FROM \`${userObjectives}\` 
            WHERE ${j.sessionId} = ?
            GROUP BY ${j.userId}, ${j.objectiveId}
        ) J
        JOIN \`${gameObjectives}\` O ON J.${j.objectiveId} = O.${o.objectiveId}
    ) J2
    GROUP BY J2.${j.objectiveId}`;

    // const query = `SELECT J.${c.objectiveId}, ROUND( SUM( J.max_progress ), 2 ) AS cumulative_sum
    // FROM (
    //     SELECT ${c.objectiveId}, ${c.userId}, MAX(${c.progress}) as max_progress
    //     FROM \`${table}\`
    //     WHERE ${c.sessionId} = ?
    //     GROUP BY ${c.objectiveId}, ${c.userId}
    // ) J
    // GROUP BY J.${c.objectiveId}
    // `;

    // const query = `SELECT 
    //     J.${j.objectiveId}, 
    //     ROUND(SUM(J.max_progress), 2) AS cumulative_sum, 
    //     O.${o.maxValue}, 
    //     MIN(J.${j.sessionId}) as session_id,  
    //     COUNT(J2.${j2.userId}) as user_id
    // FROM (
    //     SELECT ${j.objectiveId}, ${j.userId}, MAX(${j.progress}) as max_progress, MIN(${j.sessionId}) as session_id
    //     FROM \`${userObjectives}\`
    //     WHERE ${j.sessionId} = ?
    //     GROUP BY ${j.objectiveId}, ${j.userId}
    // ) J
    // INNER JOIN \`${gameObjectives}\` O ON J.${j.objectiveId} = O.${o.objectiveId}
    // INNER JOIN (
    //     SELECT ${j2.sessionId}, COUNT(${j2.userId}) as user_id
    //     FROM \`${sessionMembers}\`
    //     GROUP BY ${j2.sessionId}
    // ) J2 ON J.${j.sessionId} = J2.${j2.sessionId}
    // GROUP BY J.${j.objectiveId};
    // `;

    // l.logc(query, fn);

    const values: string[] = [sessionId];

    return new Promise<ReportIntermediateObjectiveCompletionProgress[]>((resolve, reject) => {
        sql.getPool()!.query(query, values, (err, result) => {
            if (err) {
                l.logc(err.message, fn)
                reject('Could not retrieve User Objectives groupbed by each objective');
            }
            else {
                resolve(result);
            }
        });
    })
}

export function getUserObjectiveBreakdown(sessionId: string): Promise<GameSessionUserObjectiveBreakdown[]> {

    const fn = 'getUserObjectiveBreakdown';
    const userObjectives = sql.tables.gameSessionUserObjective;
    const gameObjectives = sql.tables.gameObjective;
    const users = sql.tables.users;
    const j = sql.columns.gameSessionUserObjective;
    const o = sql.columns.gameObjective;
    const u = sql.columns.users;

    const values: string[] = [sessionId, sessionId, sessionId];
    const query = 
`SELECT 
    M.${j.userId}, 
    U.user_name,
    ROUND( SUM(M.progress) / COUNT(M.progress), 4) as total_progress, 
    M2.total_play_duration, 
    COALESCE(M3.completed_objective_count, 0) as completed_objective_count,
    ROUND (
        COALESCE(M3.completed_objective_count, 0) / ROUND( SUM(M.progress) / COUNT(M.progress), 4),
        4
    ) as velocity

/* Total Progress (M) */
FROM (
    SELECT 
        J.${j.userId}, J.${j.objectiveId}, MAX(J.${j.progress}) as max_progress, 
        O.${o.maxValue}, ROUND(MAX(J.${j.progress}) / O.${o.maxValue}, 4) as progress
    FROM \`${userObjectives}\` J
    INNER JOIN \`${gameObjectives}\` O ON J.${j.objectiveId} = O.${o.objectiveId}
    WHERE J.${j.sessionId} = ?
    GROUP BY J.${j.userId}, J.${j.objectiveId}
) M

/* Total Play Duration (M2) */
INNER JOIN (
    SELECT J.${j.userId}, SUM(J.play_duration) as total_play_duration
    FROM (
        SELECT 
            ${j.userId}, ${j.playNonce}, 
            TIMESTAMPDIFF(SECOND, MIN(${j.lastUpdated}), MAX(${j.lastUpdated})) as play_duration
        FROM \`${userObjectives}\`
        WHERE ${j.sessionId} = ?
        GROUP BY ${j.userId}, ${j.playNonce}
    ) J
    GROUP BY J.${j.userId}
) M2 ON M.${j.userId} = M2.${j.userId}

/* Completed Objectives (M3) */
LEFT JOIN (
    SELECT Q.${j.userId}, COUNT(Q.${j.progress}) as completed_objective_count
    FROM (
        SELECT J.${j.userId}, MAX(J.${j.progress}) as progress, O.${o.maxValue}
        FROM \`${userObjectives}\` J
        INNER JOIN \`${gameObjectives}\` O ON J.${j.objectiveId} = O.${o.objectiveId}
        WHERE J.${j.progress} >= O.${o.maxValue} AND ${j.sessionId} = ?
        GROUP BY J.${j.userId}, J.${j.objectiveId}
    ) Q
    GROUP BY Q.${j.userId}
) M3 ON M.${j.userId} = M3.${j.userId}

/* Users (U) */
INNER JOIN \`${users}\` U ON M.${j.userId} = U.${u.userId}

GROUP BY M.${j.userId}`;

    // l.logc(query, fn);

    return new Promise<GameSessionUserObjectiveBreakdown[]>((resolve, reject) => {
        sql.getPool()!.query(query, values, (err, result) => {
            if (err) {
                l.logc(err.message, fn)
                reject('Could not retrieve User Objectives breakdown');
            }
            else {
                resolve(result);
            }
        });
    });

}