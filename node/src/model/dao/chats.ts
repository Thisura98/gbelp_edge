import { ObjectId } from 'bson';
import { ChatGroup, ChatGroupType, ChatMessage, IChatGroup } from '../../../../commons/src/models/chat/index'
import * as mongo from '../../Util/connections/mongo/mongo_connection';
import * as l from '../../Util/logger';
import * as sessionDAO from '../dao/session';

/**
 * Create or retrieve existing chat group for the session ID.
 * @param sessionId Fetches the chat group for this session ID
 */
export function createGetChatsForSession(
    sessionId: string
): Promise<ChatGroup>{
    return new Promise<ChatGroup>((resolve, reject) => {
        
        getGroupChat(ChatGroupType.chatAtSessionLevel, sessionId).then(group => {
            return Promise.resolve(group)
        })
        .catch(err => {
            l.logc(err, 'createGetChatsForSession-intermediate');
            return sessionDAO.getMembersInSession(sessionId).then(members => {
                return createGroupChat(
                    ChatGroupType.chatAtSessionLevel, 
                    sessionId, 
                    members, 
                    [],  // Special Admins
                    []   // Initial Messages
                )
                .catch(err => {
                    l.logc(err, 'createGetChatsForSession-i2');
                    return undefined;
                })
            });
        })
        .then(group => {
            if (group === undefined){
                reject('Group could not be retrieved or created');
                return;
            }
            resolve(group);
        })
        .catch(err => {
            l.logc(err, 'createGetChatsForSession');
            reject(err);
        })

    });
}

export function createGroupChat(
    type: number,
    key: string,
    memberIds: string[],
    specialAdminIds: string[],
    messages: ChatMessage[]
): Promise<ChatGroup>{

    const group = {
        _id: undefined,
        type: type,
        key: key,
        members: memberIds,
        special_admins: specialAdminIds,
        messages: messages
    };

    return mongo.Collections.getGroupChats().insertOne(group).then(res => {
        return mongo.Collections.getGroupChats().findOne({_id: res.insertedId});
    })
    .then(doc => {
        return doc as ChatGroup;
    });

}

export function getGroupChat(
    type: number,
    key: string
): Promise<ChatGroup>{
    return mongo.Collections.getGroupChats().findOne({
        $and: [
            {type: type},
            {key: key}
        ]
    })
    .then(doc => {
        if (doc === undefined){
            return Promise.reject();
        }
        return doc as ChatGroup;
    })
    .catch(err => {
        l.logc(err, 'getGroupChat');
        return Promise.reject(err);
    })
}

export function insertIntoChat(
    type: number,
    key: string,
    message: ChatMessage
): Promise<boolean>{
    const query = {
        $and: [
            {type: type},
            {key: key}
        ]
    };
    const update = {
        $push: {
            messages: message
        }
    };

    return mongo.Collections.getGroupChats().updateOne(query, update)
    .then(result => {
        if (result.modifiedCount == 0){
            l.logc(JSON.stringify(result), 'insertIntoChat');
            return Promise.reject(false);
        }
        else{
            l.logc(JSON.stringify(result), 'insertIntoChat-b1');
            return Promise.resolve(true);
        }
    })
    .catch(err => {
        l.logc(err, 'insertIntoChat');
        return Promise.reject(err);
    })
}