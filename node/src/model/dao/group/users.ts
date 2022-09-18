import { UserGroupMemberData, UserGroupMember, UserGroupMemberRaw, UserGroupMemberHelper, UserGroupMemberAssociation} from '../../../../../commons/src/models/groups/member';
import { UserType, UserRelationshipType } from '../../../../../commons/src/models/user';
import * as sql from '../../../util/connections/sql/sql_connection';
import * as l from '../../../util/logger';

/**
 * Returns membership info about a group
 */
export async function getGroupUsers(groupId: string): Promise<UserGroupMemberData>{
    return new UserGroupMemberData(
        await getTeachers(groupId),
        await getStudents(groupId),
        await getParents(groupId)
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

/**
 * Returns associations to the "target user", of a particular relationshipTypeId.
 */
export function getUserAssocations(target: string, relationshipTypeIds: string[]): Promise<UserGroupMemberAssociation[]>{
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

    l.logc(query, "getUserAssocation");

    return new Promise<UserGroupMemberAssociation[]>((resolve, reject) => {
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
    return getUserAssocations(userId, [UserRelationshipType.guardianAndChild]);
}

export function getParentAssociations(userId: string): Promise<UserGroupMemberAssociation[]>{
    return getUserAssocations(userId, [UserRelationshipType.guardianAndChild]);
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

        for (let rawMember of raw){
            getStudentAssociations(rawMember.user_id)
            .then(association => {
                members.push(UserGroupMemberHelper.fromRaw(rawMember, association));
            })
            .catch(err => Promise.reject(err));
        }
        
        return members;
    });
}

/**
 * Parents in a group
 */
 function getParents(groupId: string): Promise<UserGroupMember[]>{
    return getUserTypeInGroup(groupId, UserType.parent)
    .then(raw => {
        let members: UserGroupMember[] = [];

        for (let rawMember of raw){
            getParentAssociations(rawMember.user_id)
            .then(association => {
                members.push(UserGroupMemberHelper.fromRaw(rawMember, association));
            })
            .catch(err => Promise.reject(err));
        }
        
        return members;
    });
}