const cors = require('cors');
const pc = require('./src/util/parseconfig');
const l = require('./src/util/logger');
const apiHandler = require('./src/network/api_handler');
const gameApiHandler = require('./src/network/game_api_handler');
const sql = require('./src/util/connections/sql/sql_connection');
const mongo = require('./src/util/connections/mongo/mongo_connection');

const express = require('express');
const bp = require('body-parser'); // This is lame!
const app = express();

const config = pc.parseConfig('config.json');
const constPortExpress = config.port_express;
const constAngularDirectory = config.angular_directory;

const indexFile = `${__dirname}/${constAngularDirectory}/index.html`;

/**
 * Initialize DBs
 */
sql.initialize();
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
gameApiHandler.handle(app);

// MARK: Angular App (GET methods)
// Angular App, its static files (js, css), fallthrough (catch-all get)

// : The Angular Application
app.get('/', (req, res) => {
    res.sendFile(indexFile);
});

// : Server File System Files
app.get(`/${config.fs_res_path}/*`, express.static(`${__dirname}/`, {fallthrough: false}));

// : The Angular Static files (js, css)
app.get('*.*', express.static(`${__dirname}/${constAngularDirectory}`, {fallthrough: false}));

// : Fall through option if file is not found
//   Non-existed GET urls will show the Angular index.html file
app.get('*', (req, res) => {
    res.sendFile(indexFile);
});

// END MARK

app.listen(constPortExpress, () => {
    l.logc(`Express app started listening on port '${constPortExpress}'!`);
});