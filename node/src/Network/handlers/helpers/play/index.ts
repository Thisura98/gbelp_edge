import * as sessionDAO from '../../../../model/dao/session';
import path from "path";
import * as utils from '../../../../util/utils';
import * as l from '../../../../Util/logger';
import * as gameCompiler from '../../../../game_compiler/index';

export function getGameJS(sessionId: string, userId: string): Promise<string>{

    return new Promise<string>((resolve, reject) => {
        sessionDAO.checkUserBelongsToSession(
            userId, sessionId
        ).then(doesBelong => {
            if (doesBelong){
                // Find game ID from session
                return sessionDAO.getSession(sessionId);
            }
            else{
                return Promise.reject('User does not belong to session');
            }
        })
        .then(session => {
            const gameEntryID = session.game_entry_id;
            console.log(JSON.stringify(session), gameEntryID, String(gameEntryID));
            if (gameEntryID){
                return Promise.resolve(gameEntryID)
            }
            else{
                return Promise.reject('Could not find game ID and play/get-game-js');
            }
        })
        .then(gameId => {
            return gameCompiler.getCompileGameURLForGameId(gameId);
        })
        .then(gameJSURL => {
            const absolutePath = path.join(utils.getRootPath(), gameJSURL);
            resolve(absolutePath);
        }).catch(error => {
            l.logc(error, 'play/get-game-js - catch');
            reject(error);
        });
    });

}

