const fs = require('fs');
const l = require('./logger');

/**
 * Synchonously processes and returns the configuration file
 * @param {string} filename 
 * @return {object} configuration file
 */
function parseConfig(filename){
    try{
        const data = fs.readFileSync(filename).toString();
        const obj = JSON.parse(data);
        return obj;
    }
    catch(err){
        l.logc(`Could not find file named ${filename}`, 'parseConfig');
    }
}

module.exports.parseConfig = parseConfig;