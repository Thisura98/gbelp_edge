import { GameEntry } from '../../../commons/src/models/game/game';
import { GameProject } from '../../../commons/src/models/game/project';
import * as fs from 'fs';
import * as gamesDAO from './../model/dao/games';
import * as l from '../util/logger';

import * as pc from '../util/parseconfig';
const config = pc.parseConfig('config.json')

/**
 * Extract the contents of the singeplayer game library
 * @returns {string}
 */
function getSingleplayerGameLibContent(): Promise<string>{
    const filePath = `src/gamelib/singleplayer.lib.js`;
    return new Promise<string>((resolve, reject) => {
        fs.readFile(filePath, '', (error, data) => {
            if (error){
                reject(error)
            }
            else{
                resolve(data);
            }
        })
    });
}

/**
 * Generate a URL for the Game JS file on demand using the Game ID
 */
export function getCompileGameURLForGameId(
    gameId: string
): Promise<string>{
    const result = new Promise<any>((resolve, reject) => {
        gamesDAO.getGame(gameId, (status, msg, result) => {
            if (status)
                resolve(result);
            else
                reject(msg);
        });
    }).then(result => {
        return getCompiledGameURL(
            result.entry,
            result.project
        );
    }).catch((err) => {
        l.logc(err, 'getCompileGameURLForGameId');
        return 'not found';
    });

    return result;
}

/**
 * Generate URL for the Game JS file on demand using the game entry and project
 */
export function getCompiledGameURL(
    gameEntry: GameEntry,
    gameProject: GameProject
): Promise<string>{

    const fileName = gameProject._id;
    const directory = config.fs_compiled_games;
    const filePath = `${directory}/${fileName}.js`;
    
    let gameJS = '';

    return new Promise<string>((resolve, reject) => {
        getSingleplayerGameLibContent().then(gameLib => {
            gameJS += gameLib;
            gameJS += "\n\n";
            gameJS += 'console.log("Hello World");';
        }).catch((err) => {
            reject('Game Lib Error: ' + err);
        }).then(() => {
            fs.writeFile(filePath, gameJS, {}, (error) => {
                if (error){
                    reject(error.message);
                }
                else{
                    resolve(filePath);
                }
            });
        }).catch(err => {
            reject(err);
        });
    });
}