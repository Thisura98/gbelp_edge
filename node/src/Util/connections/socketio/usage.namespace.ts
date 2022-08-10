import socket, { Server, Socket } from 'socket.io';
import * as usersDAO from '../../../model/dao/users';
import * as metricsDAO from '../../../model/dao/metrics';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { DateTime } from 'luxon';
import * as crypto from '../../crypto';

function createPlayNonce(): string{
    const value = DateTime.now().toISO({includeOffset: false});
    return crypto.encrypt(value);
}

/**
 * Setups the /usage namespace for a Socket IO connection.
 * 
 * The namespace itself must be instantiated from the `Server.of` method.
 * 
 * @param usageNamespace A namespace created from an SocketIO `Server` instance
 */
export function setupUsageNamespace(usageNamespace: socket.Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>){
    // Middleware for authorization in /usage namespace
    usageNamespace.use((s, next) => {
        const userId = s.handshake.auth['uid'] as string;
        const auth = s.handshake.auth['auth'] as string;

        if (userId == undefined || auth == undefined){
            next(new Error("User validation failed at handshake in usage namesapce"));
            return;
        }

        usersDAO.isTokenValidForUser(userId!, auth!, (status) => {
            if (status == 2)
                next();
            else if (status == -1)
                next(new Error("User Auth details missing at handshake in usage namespace"));
            else if (status == -2)
                next(new Error("User auth expired at usage namespace"));
            else
                next(new Error("Unknown error at usage namespace"));
        })
    });

    // Handle connections for /usage namespace
    usageNamespace.on('connection', (socket) => {
        const playNonce = createPlayNonce();
        const userId = socket.handshake.auth['uid'] as string;
        const sessionId = socket.handshake.auth['sessionId'] as string;

        metricsDAO.recordSessionUsage(sessionId, userId, '1', playNonce).then(result => {
            if (!result){ return Promise.reject('Recorindg usage failed'); }
            socket.emit('play-nonce', { nonce: playNonce });
        })
        socket.on('disconnect', () => {
            metricsDAO.recordSessionUsage(sessionId, userId, '0', playNonce);
        })
    });
}