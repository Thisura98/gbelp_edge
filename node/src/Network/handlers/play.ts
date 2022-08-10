import { Express } from 'express';
import { aurl } from '../api_handler';
import { ResponseModel } from '../../model/models/common';
import * as l from '../../util/logger';
import * as helper from './helpers/play';
import { updateObjectiveProgress } from './helpers/play/update-objective';

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

    app.post(aurl('play/update-objective'), (req, res) => {
        const nonce = req.body.nonce as string;
        const sessionId = req.body.sessionId as string;
        const objectiveId = req.body.objectiveId as string;
        const newProgress = req.body.progress as string;
        const uid = req.header('uid');

        updateObjectiveProgress(nonce, sessionId, objectiveId, newProgress, uid)
        .then(success => {
            if (success)
                res.send(new ResponseModel(true, 200, 'Objective Progress updated successfully'));
            else
                res.send(new ResponseModel(false, 200, 'Unknown error occurred while trying to update progress'));
                
        })
        .catch(error => {
            res.send(new ResponseModel(false, 200, error));
        })
    });
}