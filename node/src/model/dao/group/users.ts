import { UserGroupMemberData, UserGroupMember } from '../../../../../commons/src/models/groups/member';
import * as sql from '../../../util/connections/sql/sql_connection';

/**
 * Returns membership info about a group
 */
export async function getGroupUsers(groupId: string): Promise<UserGroupMemberData>{
    // const teachers = await getTeachers(groupId);
    // return new UserGroupMemberData(teachers, [], []);
    return getTeachers(groupId)
    .then(teachers => {
        return new UserGroupMemberData(teachers, [], []);
    });
}

/**
 * Teachers in a group
 */
function getTeachers(groupId: string): Promise<UserGroupMember[]>{
    const users = sql.tables.users;
    const userGroupMembership = sql.tables.userGroupMembership;

    const u = sql.columns.users;
    const m = sql.columns.userGroupMembership;

    const values = [groupId];
    const query = `
SELECT U.${u.userId}, U.${u.userName} 
FROM \`${userGroupMembership}\` M
INNER JOIN \`${users}\` U ON M.${m.userId} = U.${u.userId}
WHERE U.${u.userType} = ?;`;

    return new Promise<UserGroupMember[]>((resolve, reject) => {
        sql.getPool()!.query(query, values, (error, result) => {
            if (error == null){
                resolve(result);
            }
            else{
                reject(error);
            }
        });
    });

}