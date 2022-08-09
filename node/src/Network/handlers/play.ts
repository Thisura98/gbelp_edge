import { Express } from 'express';
import { aurl } from '../api_handler';
import { ResponseModel } from '../../model/models/common';
import * as l from '../../util/logger';
import * as helper from './helpers/play';

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

        helper.getGameJS(sessionId, userId)
        .then(gameJSPath => {
            res.type('text/javascript').sendFile(gameJSPath, (err) => {
                if (err){
                    l.logc(`Could not locate game lib file at "${gameJSPath}"`, 'play/get-game-js - fs err')
                    l.logc(err.message, 'play/get-game-js - fs err');
                }
            });
        })
        .catch(error => {
            res.sendStatus(404);
        })
    });
}