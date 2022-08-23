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