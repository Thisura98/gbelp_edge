import cors from 'cors';
import { getConfig } from './src/Util/config';
import * as l from './src/Util/logger';
import * as apiHandler from './src/network/api_handler';
import { fileHandler } from './src/network/file_handler';
// import * as gameApiHandler from './src/network/game_api_handler';
import * as sql from './src/util/connections/sql/sql_connection';
import * as mongo from './src/util/connections/mongo/mongo_connection';
import * as utils from './src/util/utils';

import { SocketHandler } from './src/util/connections/socketio/sockets';

import express from 'express';
import * as fs from 'fs';

// import bp from 'body-parser';
const app = express();

const config = getConfig();
const constPortExpress = config.port_express;
const constAngularDirectory = config.angular_directory;
const constPortSocketIO = config.port_socketio;
const constAllowCorsOn = config.allow_cors_on;

const indexFile = `${__dirname}/${constAngularDirectory}/index.html`;

utils.setRootPath(__dirname);

/**
 * Initialize DBs
 */
sql.initialize(config);
mongo.initialize();

/**
 * Allow CORS (Angular won't work without it)
 * 04/06/2021 - Temporarily allowing all hosts (Angular + Ct.js)
 */
app.use(cors());

/**
 * Allow body parsing
 */
app.use(express.json());

// MARK: Any route that should match before it gets to the angular Application

// API calls handler
apiHandler.handle(app);

// EDGE Game API calls handler
// gameApiHandler.handle(app);

// MARK: Angular App (GET methods)
// Angular App, its static files (js, css), fallthrough (catch-all get)

// : The Angular Application
app.get('/', (req, res) => {
    res.sendFile(indexFile);
});

// : Server File System Files
// app.get(`/${config.fs_res_path}/*`, express.static(`${__dirname}/`, {fallthrough: false}));
fileHandler(app);

// : The Angular Static files (js, css)
app.get('*.*', express.static(`${__dirname}/${constAngularDirectory}`, {fallthrough: false}));

// : Fall through option if file is not found
//   Non-existent GET urls will show the Angular index.html file
app.get('*', (req, res) => {
    res.sendFile(indexFile);
});

// END MARK

// MARK: Initialize Socket IO

// const socketServer = http.createServer();
// const io = new socket.Server(socketServer, {
//     cors: {
//         origin: constAllowCorsOn,
//         methods: ['GET', 'POST']
//     }
// });
// io.on('connection', (socket) => {
//     l.logc('New socket IO connection! ' + socket.id, 'socket-io');
//     socket.on('disconnect', () => {
//         l.logc('Socket disconnected ' + socket.id, 'socket-io');
//     })
// });
// socketServer.listen(constPortSocketIO);

const socketHandler = new SocketHandler(constPortSocketIO, constAllowCorsOn);

// END MARK: Socket IO

app.listen(constPortExpress, () => {
    l.logc(`Express app started listening on port '${constPortExpress}'!`);
});