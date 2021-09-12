import socket, { Server, Socket } from 'socket.io';
import * as usersDAO from '../../../model/dao/users';
import * as metricsDAO from '../../../model/dao/metrics';
import * as chatDAO from '../../../model/dao/chats';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { DateTime } from 'luxon';
import * as crypto from '../../crypto';
import * as l from '../../logger';


/**
 * Setups the /chats namespace for a Socket IO connection.
 * 
 * The namespace itself must be instantiated from the `Server.of` method.
 * 
 * @param chatsNamespace A namespace created from an SocketIO `Server` instance
 */
 export function setupChatsNamespace(chatsNamespace: socket.Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>){

    // Middleware for authorization in /chats namespace
    chatsNamespace.use((s, next) => {
        const userId = s.handshake.auth['uid'] as string;
        const auth = s.handshake.auth['auth'] as string;

        if (userId == undefined || auth == undefined){
            next(new Error("User validation failed at handshake in chats namesapce"));
            return;
        }

        usersDAO.isTokenValidForUser(userId!, auth!, (status) => {
            if (status == 2)
                next();
            else if (status == -1)
                next(new Error("User Auth details missing at handshake in chats namespace"));
            else if (status == -2)
                next(new Error("User auth expired at chats namespace"));
            else
                next(new Error("Unknown error at chats namespace"));
        })
    });

    // Handle connections for /usage namespace
    chatsNamespace.on('connection', (socket) => {
        const userId = socket.handshake.auth['uid'] as string;
        const chatType = socket.handshake.auth['type'] as string;
        const chatKey = socket.handshake.auth['key'] as string;
        let roomCode = '';
        let currentMessages: any[] = [];

        if (chatType == 'session'){
            const sessionId = chatKey;
            roomCode = `session_${sessionId}`;

            chatDAO.createGetChatsForSession(sessionId).then(chatGroup => {
                currentMessages = chatGroup.messages;
            })
        }
        else{
            // tbd
        }

        socket.join(roomCode);

        l.logc(`${userId} joined chat room ${roomCode}`);

        // emit current messages
        socket.emit('chat-init', currentMessages);

        // on message add to chat document & broadcast to others in room
        socket.on('chat-add', (message) => {
            l.logc(`${userId} sent message to ${roomCode} = ${JSON.stringify(message)}`);
            
            // message should be of type ChatMessage
            chatDAO.insertIntoChat(
                Number.parseInt(chatType), 
                chatKey, 
                message
            ).then(result => {
                if (!result)
                    return;

                socket.broadcast.to(roomCode).emit('chat-did-add', message);
            })
        });
    });
}