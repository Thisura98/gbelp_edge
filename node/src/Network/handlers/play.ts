import { Express } from 'express';
import { aurl } from '../api_handler';
import { ResponseModel } from '../../model/models/common';
import * as l from '../../util/logger';
import * as helper from './helpers/play';
import * as sessionDAO from '../../model/dao/session';
import * as metricsDAO from '../../model/dao/metrics';
import { isEmptyParam } from '../../util/utils';

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

        if (isEmptyParam(uid)){
            res.send(new ResponseModel(false, 200, 'User ID invalid'));
            return;
        }

        if (isEmptyParam(sessionId)){
            res.send(new ResponseModel(false, 200, 'Session ID invalid'));
            return;
        }

        sessionDAO.checkUserBelongsToSession(uid!, sessionId)
        .then(belongs => {
            if (!belongs){
                return Promise.reject('User does not belong to session');
            }
            return Promise.resolve();
        })
        .then(() => {
            const parsed = Number.parseFloat(newProgress);
            if (isNaN(parsed))
                return Promise.reject('Progress is not a number');
            else
                return parsed;
        })
        .then(progress => {
            if (nonce != null && objectiveId != null && newProgress != null){
                return metricsDAO.recordSessionObjectiveProgress(
                    sessionId, objectiveId, uid!, nonce, progress
                );
            }
            else{
                return Promise.reject('Required parameter for updating objective was null');
            }
        })
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