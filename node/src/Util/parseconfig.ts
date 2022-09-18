import * as l from './logger';
import fs from 'fs';

/**
 * NOTE: Make sure this interface is upto date with the config.json file
 */
export interface IConfig{
    environment: string;
    port_express: number;
    port_socketio: number;
    angular_directory: string;
    allow_cors_on: string;
    fs_res_path: string;
    fs_res_path_sound: string;
    fs_res_path_image: string;
    fs_compiled_games: string;
    fs_articles: string;
    server_base_url: string;
    production_database: string;
    test_database: string;
}

/**
 * Synchonously processes and returns the configuration file
 * @param {string} filename 
 * @return {object} configuration file
 */
export function parseConfig(filename: string): IConfig{
    try{
        const data = fs.readFileSync(filename).toString();
        const obj = JSON.parse(data);
        return obj as IConfig;
    }
    catch(err){
        throw new Error(`parseconfig - Could not find file named ${filename}`);
    }
}