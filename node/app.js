const pc = require('./src/Util/parseconfig');
const l = require('./src/Util/logger');

const express = require('express');
const app = express();

const config = pc.parseConfig('config.json');
const const_port_express = config.port_express;
const const_angular_directory = config.angular_directory;

const indexFile = `${__dirname}/${const_angular_directory}/index.html`;

// MARK: Any route that should match before it gets to the angular Application



// MARK: Angular App (GET methods)
// Angular App, its static files (js, css), fallthrough (catch-all get)

// : The Angular Application
app.get('/', (rq, re) => {
    re.sendFile(indexFile);
});

// : The Angular Static files (js, css)
app.get('*.*', express.static(`${__dirname}/${const_angular_directory}`, {fallthrough: false}));

// : Fall through option if file is not found
//   Non-existed GET urls will show the Angular index.html file
app.get('*', (rq, re) => {
    re.sendFile(indexFile);
});

// END MARK

app.listen(const_port_express, () => {
    l.logc(`Express app started listening on port '${const_port_express}'!`);
});