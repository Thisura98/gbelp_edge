import socket, { Server, Socket } from 'socket.io';
import { DateTime } from 'luxon';
import http from 'http';

import * as l from '../../logger';
import * as crypto from '../../crypto';
import * as usersDAO from '../../../model/dao/users';
import * as metricsDAO from '../../../model/dao/metrics';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

/**
 * Log items for the SocketHandler module.
 */
function log(...items: any[]){
    const joined = items.map(v => String(v)).join(' ');
    l.logc(joined, 'SocketHandler');
}

/**
 * Socket IO Handler for Edge System.
 * Instantiate and maintain reference.
 */
export class SocketHandler{

    private io: Server | undefined;

    constructor(
        port: number,
        allowCorsOn: string,
    ){
        const socketServer = http.createServer();
        this.io = new socket.Server(socketServer, {
            cors: {
                origin: allowCorsOn,
                methods: ['GET', 'POST']
            }
        });

        this.setup();
        
        this.io.listen(port);
    }

    private setup(){
        const usageNamespace = this.io!.of('/usage');
        this.createUsageNamespace(usageNamespace);
    }

    private createPlayNonce(): string{
        const value = DateTime.now().toISO({includeOffset: false});
        return crypto.encrypt(value);
    }

    private createUsageNamespace(usageNamespace: socket.Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>){
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
            const playNonce = this.createPlayNonce();
            const userId = socket.handshake.auth['uid'] as string;
            const sessionId = socket.handshake.auth['sessionId'] as string;

            metricsDAO.recordUsage(sessionId, userId, '1', playNonce).then(result => {
                if (!result){ return Promise.reject('Recorindg usage failed'); }
                socket.emit('play-nonce', { nonce: playNonce });
            })
            socket.on('disconnect', () => {
                metricsDAO.recordUsage(sessionId, userId, '0', playNonce);
            })
        });
    }
}