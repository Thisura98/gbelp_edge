import { ReportGraphDataUserObjectiveCompletionProgress } from '../../../../../commons/src/models/reports/user.objective';
import { GameSessionUserObjective } from '../../../../../commons/src/models/session/user.objective';
import * as sql from '../../../util/connections/sql/sql_connection';
import * as l from '../../../util/logger';


export function getUserObjectiveProgress(sessionId: string): Promise<GameSessionUserObjective[]>{

    const fn = 'getUserObjectiveProgress';
    const table = sql.tables.gameSessionUserObjective;
    const c = sql.columns.gameSessionUserObjective;

    const query = `SELECT * FROM ${table}
    WHERE ${c.sessionId} = ?
    ORDER BY ${c.lastUpdated} ASC
    `;
    const values: string[] = [ sessionId ];

    return new Promise<GameSessionUserObjective[]>((resolve, reject) => {
        sql.getPool()!.query(query, values, (err, result) => {
            if (err){
                l.logc(err.message, fn)
                reject('Could not retrieve User Objectives');
            }
            else{
                resolve(result);
            }
        });
    });

}

export function getUserObjectiveProgressByCompletion(sessionId: string): Promise<ReportGraphDataUserObjectiveCompletionProgress[]>{
    
    const fn = 'getUserObjectiveProgressByObjective';
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
        INNER JOIN \`${gameObjectives}\` O ON J.${j.objectiveId} = O.${o.objectiveId}
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

    return new Promise<ReportGraphDataUserObjectiveCompletionProgress[]>((resolve, reject) => {
        sql.getPool()!.query(query, values, (err, result) => {
            if (err){
                l.logc(err.message, fn)
                reject('Could not retrieve User Objectives groupbed by each objective');
            }
            else{
                resolve(result);
            }
        });
    })
}