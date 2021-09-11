import { UserGroup, UserGroupComposition } from '../../../../commons/src/models/groups';
import * as sql from '../../util/connections/sql/sql_connection';
import * as userDAO from './users';
import * as crypto from '../../util/crypto';
import * as l from '../../util/logger';

/**
 * Creates a new group with the details. Optionally 
 * adds the provided users to the group. Returns a promise
 * with the group id.
 * 
 * @param name Name of the Group
 * @param bannedUsersCSV Comma separated string of User IDs
 * @param insertUserIds Array of user IDs to take membership of the created group
 */
 export function createGroup(
    name: string,
    description: string,
    bannedUsersCSV: string,
    inviteLink: string | undefined,
    userLimit: string | undefined,
    insertUserIds: string[] | undefined,
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
    })
    .then(groupId => {
        // Set the invite key
        // [Continue even if it fails]
        return new Promise<string>((resolve, reject) => {
            const key = crypto.encrypt(groupId.toString());
            const query = `UPDATE ${sql.tables.userGroup}
            SET ${c.inviteLink} = '${key}'
            WHERE ${c.groupId} = '${groupId}'
            `;

            // console.log('set-invite-key query', query);

            sql.getPool()!.query(query, (error, result) => {
                if (error)
                    l.logc('Could not set Invite Key ' + error, 'set-invite-key');

                resolve(groupId);
            })
        })
    })

}

/**
 * @param groupId Group ID
 * @param userIds List of users (not csv, should be array)
 * @returns True if success. Promise error if failed.
 */
export function insertUsersToGroup(
    groupId: string,
    userIds: string[]
): Promise<boolean>{
    const e = sql.escape;
    const valueTuples = userIds.map((uid) => {
        const values = [e(uid), e(groupId)].join(',');
        return `(${values})`
    });

    const query = `INSERT IGNORE INTO ${sql.tables.userGroupMembership}
    (${sql.columns.userGroupMembership.userId}, ${sql.columns.userGroupMembership.groupId})
    VALUES ${valueTuples.join(',')}`;

    // console.log(query);

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
                resolve(result[0]);
            }
        });
    });
}

/**
 * Checks if a user is a member of the provided group.
 * Promise's result will be true if the membership exists. False otherwise.
 */
export function checkUserMembership(
    groupId: string,
    userId: string,
): Promise<boolean>{
    const tbl = sql.tables.userGroupMembership;
    const cUserId = sql.columns.userGroupMembership.userId;
    const cGroupId = sql.columns.userGroupMembership.groupId;
    const se = sql.smartEscape;

    const query = `SELECT COUNT(*) AS cnt
    FROM \`${tbl}\`
    WHERE ${cUserId} = ${se(userId)} AND ${cGroupId} = ${se(groupId)}`;

    return new Promise<boolean>((resolve, reject) => {
        sql.getPool()!.query(query, (error, result) => {
            if (error){
                reject(error.message);
            }
            else{
                if (result.length > 0){
                    const count = Number.parseInt(result[0]['cnt']);
                    resolve(count > 0);
                }
                else{
                    resolve(false);
                }
            }
        });
    });
}

export function getGroupsOfUser(
    userId: string
): Promise<any>{
    const tblUserGroup = sql.tables.userGroup;
    const tblMembership = sql.tables.userGroupMembership;
    const colUG = sql.columns.userGroup.groupId;
    const colGM = sql.columns.userGroupMembership.groupId;
    const colGMuserId = sql.columns.userGroupMembership.userId;

    const query = `
    SELECT G.*, C.cnt as member_count
    FROM ${tblUserGroup} G
    INNER JOIN ${tblMembership} M
    ON G.${colUG} = M.${colGM}
    INNER JOIN (SELECT COUNT(user_id) AS cnt, group_id FROM user_group_membership GROUP BY group_id) C
    ON G.${colUG} = C.group_id
    WHERE M.${colGMuserId} = ${userId}`;

    return new Promise<any>((resolve, reject) => {
        sql.getPool()!.query(query, (error, result) => {
            if (error){
                reject(`getGroupsOfUser " + ${error.message}`);
            }
            else{
                resolve(result);
            }
        });
    })
    .then(groups => {
        return preProcessGroupInviteLinks(groups);
    })
}

export function getGroupComposition(
    groupId: string
): Promise<UserGroupComposition[]>{
    // We dont have time to use vars for table columns
    // using dirty approach by hardcoding queries
    // 11 Sept 2021 18:08
    const se = sql.smartEscape;
    const query = `SELECT U.user_type_id as type_id, T.name as type_name, COUNT(U.user_type_id) as count
    FROM \`user_group_membership\` M
    INNER JOIN \`users\` U ON U.user_id = M.user_id
    INNER JOIN \`user_type\` T ON U.user_type_id = T.user_type_id
    WHERE M.group_id = ${se(groupId)} 
    GROUP BY U.user_type_id`;

    return new Promise<UserGroupComposition[]>((resolve, reject) => {
        sql.getPool()!.query(query, (error, result) => {
            if (error){
                reject(error.message)
            }
            else{
                resolve(result);
            }
        })
    });
}

export function getGroupIdMatchingCriteria(
    userId: string,
    exactGroupCountWithUser: number,
): Promise<number | undefined>{
    const cGroup = sql.columns.userGroup;
    const cGroupMems = sql.columns.userGroupMembership;

    const qExistingGroup = `SELECT M.user_id 
    FROM user_group_membership M
    INNER JOIN (
        SELECT user_id, COUNT(group_id) as group_count FROM \`user_group_membership\` GROUP BY user_id
    ) J1
    ON M.user_id = J1.user_id
    INNER JOIN \`${sql.tables.userGroup}\` G
    ON M.${cGroupMems.groupId} = G.${cGroup.groupId}
    WHERE J1.group_count = ${exactGroupCountWithUser} 
    AND M.${cGroupMems.userId} = ${userId}`;

    // console.log(qExistingGroup);

    return new Promise<number | undefined>((resolve, reject) => {
        sql.getPool()!.query(qExistingGroup, (error, result) => {
            if (error){
                reject(error.message);
            }
            else{
                if (result.length > 0){
                    resolve(result[0]['user_id']);
                }
                else{
                    resolve(undefined);
                }
            }
        });
    });
}

/**
 * @param callingUser The user logged into the frontend 
 * @param userId The user that must be removed (can be same as callingUser for self un-enrolment)
 * @param groupId Which group to remove userId from.
 * @returns 
 */
export function removeUserFromGroup(
    callingUser: string,
    userId: string,
    groupId: string
): Promise<boolean>{
    const tbl = sql.tables.userGroupMembership;
    const cUID = sql.columns.userGroupMembership.userId;
    const cGID = sql.columns.userGroupMembership.groupId;
    const se = sql.smartEscape;

    const query = `DELETE FROM \`${tbl}\` 
    WHERE ${cUID} = ${se(userId)} 
    AND ${cGID} = ${se(groupId)}`;

    // TEACHERs and ADMINs
    let privilegedUserTypes = ['1', '2'];

    // IF the user is self-leaving a group,
    // we must allow the action regardless of their type.
    if (callingUser == userId){
        privilegedUserTypes = ['1', '2', '3', '4'];
    }

    return userDAO.checkUserType(
        userId, privilegedUserTypes
    )
    .then(isPrivileged => {
        if (!isPrivileged)
            return Promise.reject('User is not allowed to be removed from group')

        return checkUserMembership(groupId, userId)
    })
    .then(isMember => {
        if (!isMember)
            return Promise.reject('User is not part of the group ' + groupId);
        
        return Promise.resolve();
    })
    .then(() => {
        return new Promise<boolean>((resolve, reject) => {
            sql.getPool()!.query(query, (error, result) => {
                if (error){
                    reject('removeUserFromGroup' + error.message);
                }
                else{
                    resolve(result.affectedRows > 0);
                }
            })
        });
    });
    
}

interface InviteLikeProcessable{
    group_id: string
    invite_link: string
}

/**
 * Calculates and sets the cryptographic Invite Link
 * in the passed dataset.
 * 
 * @param input An array of group-like objects
 */
function preProcessGroupInviteLinks<T extends InviteLikeProcessable>(
    input: T[]
): Promise<T[]>{

    const pathPrefix = '/groups/join/';

    try{
        for (let i of input){
            // Don't re-calculate path if its already set.
            if (i.invite_link != null && i.invite_link != undefined){
                i.invite_link = `${pathPrefix}${i.invite_link}`
                continue;
            }

            // Ensure no numbers are provided
            const str = i.group_id.toString();

            const encryptedGroupId = crypto.encrypt(str);
            const path = `${pathPrefix}${encryptedGroupId}`;
            i.invite_link = path;
        }
        return Promise.resolve(input);
    }
    catch(exception){
        return Promise.reject('invitelinks - ' + exception);
    }
}