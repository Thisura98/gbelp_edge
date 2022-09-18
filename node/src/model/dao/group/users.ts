import { UserGroupMemberData, UserGroupMember, UserGroupMemberRaw, UserGroupMemberHelper, UserGroupMemberAssociation} from '../../../../../commons/src/models/groups/member';
import { UserType } from '../../../../../commons/src/models/user';
import * as sql from '../../../util/connections/sql/sql_connection';

/**
 * Returns membership info about a group
 */
export function getGroupUsers(groupId: string): Promise<UserGroupMemberData>{
    // const teachers = await getTeachers(groupId);
    // return new UserGroupMemberData(teachers, [], []);
    let data = new UserGroupMemberData([], [], []);

    return getTeachers(groupId)
    .then(teachers => {
        data.teachers = teachers;
        return getStudents(groupId);
    })
    .then(students => {
        data.students = students;
        // todo get parents
    })
    .then(() => {
        return data;
    })
}

/**
 * Returns ID and Name __(without associations)__
 * of members in a group.
 * 
 * @param groupId 
 * @param userTypeId Enum of `UserType`
 * @returns 
 */
export function getUserTypeInGroup(groupId: string, userTypeId: string): Promise<UserGroupMemberRaw[]>{
    const users = sql.tables.users;
    const userGroupMembership = sql.tables.userGroupMembership;

    const u = sql.columns.users;
    const m = sql.columns.userGroupMembership;

    const values = [userTypeId, groupId];
    const query = `
SELECT U.${u.userId}, U.${u.userName} 
FROM \`${userGroupMembership}\` M
INNER JOIN \`${users}\` U ON M.${m.userId} = U.${u.userId}
WHERE U.${u.userType} = ? AND M.${m.groupId} = ?;`;

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

export function getUserAssociations(userId: string): Promise<UserGroupMemberAssociation[]>{
    // todo: implement retrieve associations for user.
    return Promise.resolve([]);
}

/**
 * Teachers in a group
 */
function getTeachers(groupId: string): Promise<UserGroupMember[]>{
    return getUserTypeInGroup(groupId, UserType.teacher)
    .then(raw => {
        return raw.map(m => UserGroupMemberHelper.fromRaw(m, []));
    });
}

/**
 * Students in a group
 */
function getStudents(groupId: string): Promise<UserGroupMember[]>{
    return getUserTypeInGroup(groupId, UserType.student)
    .then(raw => {
        let members: UserGroupMember[] = [];

        for (let member of members){
            const associations = getUserAssociations(member.user_id)
            .then(a => member.associations = a)
            .catch(err => Promise.reject(err));
        }
        
        return members;
    });

}