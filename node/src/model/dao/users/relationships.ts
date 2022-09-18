import * as l from '../../../util/logger';
import * as sql from '../../../util/connections/sql/sql_connection';

/**
 * @param highRankUserId High ranking user in the relationship
 * @param lowRankUserId  Lower ranking user in the relationship
 * @param relationshipType Relationship type
 * @returns 
 */
export function createRelationship(
    highRankUserId: string,
    lowRankUserId: string,
    relationshipType: string
): Promise<boolean>{

    const userRelationship = sql.tables.userRelationship;
    const r = sql.columns.userRelationship;

    const columns = [
        r.userOneRank, r.userTwoRank,
        r.userOneId, r.userTwoId, 
        r.relationshipType
    ].join(', ');

    const values = [highRankUserId, lowRankUserId, relationshipType];

    const query = `
INSERT INTO \`${userRelationship}\` (${columns}) VALUES (2, 1, ?, ?, ?);
`;

    return new Promise<boolean>((resolve, reject) => {
        sql.getPool()!.query(query, values, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(true);
        });
    })

}