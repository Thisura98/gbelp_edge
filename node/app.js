const cors = require('cors');
const pc = require('./src/util/parseconfig');
const l = require('./src/util/logger');
const apiHandler = require('./src/network/api_handler');
const sql = require('./src/util/connections/sql_connection');

const express = require('express');
const app = express();

const config = pc.parseConfig('config.json');
const constPortExpress = config.port_express;
const constAngularDirectory = config.angular_directory;

const indexFile = `${__dirname}/${constAngularDirectory}/index.html`;

/**
 * Initialize DBs
 */
sql.initialize();

// MARK: Any route that should match before it gets to the angular Application

app.use(cors());

// API calls handler
apiHandler.handle(app);

// MARK: Angular App (GET methods)
// Angular App, its static files (js, css), fallthrough (catch-all get)

// : The Angular Application
app.get('/', (req, res) => {
    res.sendFile(indexFile);
});

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