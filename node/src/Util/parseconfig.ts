import * as l from './logger';
import fs from 'fs';

/**
 * Synchonously processes and returns the configuration file
 * @param {string} filename 
 * @return {object} configuration file
 */
export function parseConfig(filename: string){
    try{
        const data = fs.readFileSync(filename).toString();
        const obj = JSON.parse(data);
        return obj;
    }
    catch(err){
        l.logc(`Could not find file named ${filename}`, 'parseConfig');
    }
}