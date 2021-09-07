import * as sql from '../../util/connections/sql/sql_connection';

/**
 * Creates a new group with the details. Optionally 
 * adds the provided users to the group. Returns a promise
 * with the group id.
 * 
 * @param name Name of the Group
 */
 export function createGroup(
    name: string,
    description: string,
    bannedUsersCSV: string,
    inviteLink: string | undefined,
    userLimit: string | undefined,
    insertUserIds: [string] | undefined,
): Promise<string>{
    // todo
    // good night for now.

    const c = sql.columns.userGroup;
    const e = sql.escape;
    const se = sql.smartEscape;
    const columns = [c.name, c.description, c.bannedUserIds, c.inviteLink, c.userLimit]
    const values = [e(name), e(description), e(bannedUsersCSV), se(inviteLink), se(userLimit)]

    const strColumns = columns.join(',');
    const strValues = values.join(',');

    const qInsertGroup = `INSERT INTO ${sql.tables.userGroup}
    (${strColumns})
    VALUES (${strValues})`;

    return new Promise<string>((resolve, reject) => {
        sql.getPool()!.query(qInsertGroup, (error, result) => {
            if (error){
                reject(error.message)
            }
            else{
                if (insertUserIds && insertUserIds.length > 0){
                    insertUsersToGroup(
                        result.insertId,
                        insertUserIds
                    ).then(() => {
                        resolve(result.insertId);
                    }).catch((e) => {
                        reject(e);
                    })
                }
                else{
                    resolve(result.insertId);
                }
            }
        })
    });

}

/**
 * @param groupId Group ID
 * @param userIds List of users (not csv, should be array)
 * @returns True if success. Promise error if failed.
 */
export function insertUsersToGroup(
    groupId: string,
    userIds: [string]
): Promise<boolean>{
    const e = sql.escape;
    const valueTuples = userIds.map((uid) => {
        const values = [e(uid), e(groupId)].join(',');
        return `(${values})`
    });

    const query = `INSERT IGNORE INTO ${sql.tables.userGroupMembership}
    (${sql.columns.userGroupMembership.userId}, ${sql.columns.userGroupMembership.groupId})
    VALUES ${valueTuples.join(',')}`;

    console.log(query);

    return new Promise<boolean>((resolve, reject) => {
        sql.getPool()!.query(query, (error, result) => {
            if (error){
                reject(error.message)
            }
            else{
                resolve(true);
            }
        })
    });
}

/**
 * @param groupId Group ID
 * @returns DB Row with Group
 */
export function getGroup(
    groupId: string
): Promise<any>{
    const query = `SELECT *
    FROM ${sql.tables.userGroup}
    WHERE ${sql.columns.userGroup.groupId} = ${sql.escape(groupId)}`;

    return new Promise<any>((resolve, reject) => {
        sql.getPool()!.query(query, (error, result) => {
            if (error){
                reject(error);
            }
            else{
                resolve(result);
            }
        });
    });
}