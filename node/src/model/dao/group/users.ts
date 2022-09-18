import { UserGroupMemberData, UserGroupMember, UserGroupMemberRaw, UserGroupMemberHelper, UserGroupMemberAssociation} from '../../../../../commons/src/models/groups/member';
import { UserType, UserRelationshipType } from '../../../../../commons/src/models/user';
import * as sql from '../../../util/connections/sql/sql_connection';
import * as l from '../../../util/logger';

/**
 * Returns membership info about a group
 */
export async function getGroupUsers(groupId: string, searchName: string | undefined = undefined): Promise<UserGroupMemberData>{
    let privileged = await getPrivilegedUsers(groupId, searchName);
    let teachers = await getTeachers(groupId, searchName);
    let students = await getStudents(groupId, searchName);
    let parents = await getParents(groupId, searchName);

    return new UserGroupMemberData(
        privileged,
        teachers,
        students,
        parents
    );
}

/**
 * Returns ID and Name __(without associations)__
 * of members in a group.
 * 
 * @param groupId 
 * @param userTypeId Enum of `UserType`
 * @returns 
 */
export function getUserTypeInGroup(groupId: string, userTypeId: string[], searchName: string | undefined): Promise<UserGroupMemberRaw[]>{
    const users = sql.tables.users;
    const userGroupMembership = sql.tables.userGroupMembership;

    const u = sql.columns.users;
    const m = sql.columns.userGroupMembership;

    const userTypeIds = "(" + userTypeId.map(sql.smartEscape).join(", ") + ")";
    const values = [groupId];
    let query = `
SELECT U.${u.userId}, U.${u.userName} 
FROM \`${userGroupMembership}\` M
INNER JOIN \`${users}\` U ON M.${m.userId} = U.${u.userId}
WHERE U.${u.userType} IN ${userTypeIds} AND M.${m.groupId} = ?`;

    // Search
    if (searchName != undefined && searchName.trim().length > 0){
        query += ` AND U.${u.userName} LIKE '%${sql.smartEscape(searchName.trim())}%';`;
    }
    else{
        query += ';';
    }

    // l.logc(JSON.stringify(values), 'getUserTypeInGroup');
    // l.logc(query + '\n', 'getUserTypeInGroup');

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

/**
 * Returns associations to the "target user", of a particular relationshipTypeId.
 */
export function getUserAssocations(target: string, relationshipTypeIds: string[]): Promise<UserGroupMemberRaw[]>{
    const users = sql.tables.users;
    const userRelationship = sql.tables.userRelationship;

    const m = sql.columns.userRelationship;
    const u = sql.columns.users;

    const values = [target, target];
    const relationshipIds = "(" + relationshipTypeIds.map(sql.smartEscape).join(", ") + ")";
    const query = `
SELECT M.target, U.${u.userName} as user_name, U.${u.userId} as user_id
FROM (
    SELECT ${m.userOneId} as target, ${m.userTwoId} as association 
    FROM \`${userRelationship}\` 
    WHERE ${m.userOneId} = ? AND ${m.relationshipType} IN ${relationshipIds}

    UNION ALL 

    SELECT ${m.userTwoId} as target, ${m.userOneId} as association 
    FROM \`${userRelationship}\` 
    WHERE ${m.userTwoId} = ? AND ${m.relationshipType} IN ${relationshipIds}
) M
INNER JOIN \`${users}\` U ON U.${u.userId} = M.association
`;

    // l.logc(query, "getUserAssocation");

    return new Promise<UserGroupMemberRaw[]>((resolve, reject) => {
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

export function getStudentAssociations(userId: string): Promise<UserGroupMemberAssociation[]>{
    return getUserAssocations(userId, [UserRelationshipType.guardianAndChild])
    .then(associations => {
        let parents = new UserGroupMemberAssociation('Child of', associations);
        return [parents];
    });
}

export function getParentAssociations(userId: string): Promise<UserGroupMemberAssociation[]>{
    return getUserAssocations(userId, [UserRelationshipType.guardianAndChild])
    .then(associations => {
        let children = new UserGroupMemberAssociation('Parent of', associations);
        return [children];
    });
}

/**
 * Privileged users in a group
 */
function getPrivilegedUsers(groupId: string, searchName: string | undefined): Promise<UserGroupMember[]>{
    return getUserTypeInGroup(groupId, [UserType.admin, UserType.creator], searchName)
    .then(raw => {
        return raw.map(m => UserGroupMemberHelper.fromRaw(m, []));
    });
}

/**
 * Teachers in a group
 */
function getTeachers(groupId: string, searchName: string | undefined): Promise<UserGroupMember[]>{
    return getUserTypeInGroup(groupId, [UserType.teacher], searchName)
    .then(raw => {
        return raw.map(m => UserGroupMemberHelper.fromRaw(m, []));
    });
}

/**
 * Students in a group
 */
function getStudents(groupId: string, searchName: string | undefined): Promise<UserGroupMember[]>{
    return getUserTypeInGroup(groupId, [UserType.student], searchName)
    .then(rawMembers => {
        let promises = rawMembers.map(raw => {
            let member = UserGroupMemberHelper.fromRaw(raw, []);

            return getStudentAssociations(raw.user_id)
            .then(assocs => {
                member.associations = assocs;
                return member;
            });
        });

        return Promise.all(promises);
    });
}

/**
 * Parents in a group
 */
 function getParents(groupId: string, searchName: string | undefined): Promise<UserGroupMember[]>{
    return getUserTypeInGroup(groupId, [UserType.parent], searchName)
    .then(rawMembers => {
        let promises = rawMembers.map(raw => {
            let member = UserGroupMemberHelper.fromRaw(raw, []);

            return getParentAssociations(raw.user_id)
            .then(assocs => {
                member.associations = assocs;
                return member;
            });
        });

        return Promise.all(promises);
    });
}