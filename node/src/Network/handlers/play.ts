import { Express } from 'express';
import { aurl } from '../api_handler';
import * as sessionDAO from '../../model/dao/session';
import * as playDAO from '../../model/dao/play';
import * as gameCompiler from '../../game_compiler/index';
import { ResponseModel } from '../../model/models/common';
import * as sql from '../../util/connections/sql/sql_connection';
import * as l from '../../util/logger';
import path from "path";
import * as utils from '../../util/utils';

// getCompileGameURLForGameId

export function handlerPlay(app: Express){
    app.get(aurl('play/get-game-js'), (req, res) => {
        const sessionId = req.query.sessionId as string;
        const userId: string | undefined = req.header('uid');

        l.logc('BP 1', 'get-game');

        if (userId == undefined){
            res.sendStatus(404);
            return;
        }

        l.logc('Fetching Game JS', 'get-game');

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
        .then(gameJS => {
            const absolutePath = path.join(utils.getRootPath(), gameJS);
            res.type('text/javascript').sendFile(absolutePath, (err) => {
                if (err){
                    l.logc(`Could not locate game lib file at "${gameJS}"`, 'play/get-game-js - fs err')
                    l.logc(err.message, 'play/get-game-js - fs err');
                }
            });
        }).catch(error => {
            l.logc(error, 'play/get-game-js - catch');
            res.sendStatus(404);
        });
    });
}