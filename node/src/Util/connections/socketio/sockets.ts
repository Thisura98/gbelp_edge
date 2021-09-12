import socket, { Server, Socket } from 'socket.io';
import http from 'http';

import * as l from '../../logger';

import { setupUsageNamespace } from './usage.namespace';
import { setupChatsNamespace } from './chats.namespace';

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
        setupUsageNamespace(usageNamespace);

        const chatsNamespace = this.io!.of('/chats');
        setupChatsNamespace(chatsNamespace);
    }
    
}