const pc = require('./src/Util/parseconfig');
const l = require('./src/Util/logger');

const express = require('express');
const app = express();

const config = pc.parseConfig('config.json');
const port_express = config.port_express;

app.get('/', (rq, re) => {
    re.send("Hello World from gbelp_edge!");
});

app.listen(port_express, () => {
    l.logc(`Express app started listening on port '${port_express}'!`);
});