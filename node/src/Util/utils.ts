import * as sql from './connections/sql/sql_connection';

/**
 * Checks whether the provided user can modify the 
 * game.
 * @param gameId Game Entry ID
 * @param userId The user who wants to change something
 * @param callback Callback with status as boolean and project ID if allowed.
 */
export function checkUserCanModifyGame(
    gameId: string, userId: string, callback: (status: boolean, projectId: string | null) => void
){
    const t = sql.tables.gameEntry;
    const c = sql.columns.gameEntry;
    const selectAuthorsQuery = `SELECT ${c.authorId}, ${c.projectId} 
        FROM ${t} 
        WHERE ${c.id} = '${gameId}'
    `;

    sql.getPool()!.query(selectAuthorsQuery, (err: any, res: any)=>{
        if (err){
            callback(false, null);
            return;
        }

        // csv of author ids - checked allowed to modify
        const authors = String(res[0][c.authorId]).split(',');
        if (authors.find(a => a == userId) == undefined){
            callback(false, null);
        }
        else{
            callback(true, res[0][c.projectId]);
        }
    })
}