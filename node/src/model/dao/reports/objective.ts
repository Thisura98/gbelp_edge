import { ReportGraphDataUserObjectivesSumByObjective } from '../../../../../commons/src/models/reports/user.objective';
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

export function getUserObjectiveProgressByObjective(sessionId: string): Promise<ReportGraphDataUserObjectivesSumByObjective[]>{
    
    const fn = 'getUserObjectiveProgressByObjective';
    const table = sql.tables.gameSessionUserObjective;
    const table2 = sql.tables.gameObjective;
    const table3 = sql.tables.gameSessionMembers;
    const j = sql.columns.gameSessionUserObjective;
    const o = sql.columns.gameObjective;
    const j2 = sql.columns.gameSessionMembers;
    
    // const query = `SELECT J.${c.objectiveId}, ROUND( SUM( J.max_progress ), 2 ) AS cumulative_sum
    // FROM (
    //     SELECT ${c.objectiveId}, ${c.userId}, MAX(${c.progress}) as max_progress
    //     FROM \`${table}\`
    //     WHERE ${c.sessionId} = ?
    //     GROUP BY ${c.objectiveId}, ${c.userId}
    // ) J
    // GROUP BY J.${c.objectiveId}
    // `;

    const query = `SELECT 
        J.${j.objectiveId}, 
        ROUND(SUM(J.max_progress), 2) AS cumulative_sum, 
        O.${o.maxValue}, 
        MIN(J.${j.sessionId}) as session_id,  
        COUNT(J2.${j2.userId}) as user_id
    FROM (
        SELECT ${j.objectiveId}, ${j.userId}, MAX(${j.progress}) as max_progress, MIN(${j.sessionId}) as session_id
        FROM \`${table}\`
        WHERE ${j.sessionId} = ?
        GROUP BY ${j.objectiveId}, ${j.userId}
    ) J
    INNER JOIN \`${table2}\` O ON J.${j.objectiveId} = O.${o.objectiveId}
    INNER JOIN (
        SELECT ${j2.sessionId}, COUNT(${j2.userId}) as user_id
        FROM \`${table3}\`
        GROUP BY ${j2.sessionId}
    ) J2 ON J.${j.sessionId} = J2.${j2.sessionId}
    GROUP BY J.${j.objectiveId};
    `;

    const values: string[] = [sessionId];

    return new Promise<ReportGraphDataUserObjectivesSumByObjective[]>((resolve, reject) => {
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