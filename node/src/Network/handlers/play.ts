import { Express } from 'express';
import { aurl } from '../api_handler';
import { ResponseModel } from '../../model/models/common';
import * as l from '../../util/logger';
import * as helper from './helpers/play';
import * as sessionDAO from '../../model/dao/session';
import * as metricsDAO from '../../model/dao/metrics';

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

        if (uid == undefined || uid == ''){
            res.send(new ResponseModel(false, 200, 'User ID invalid'));
            return;
        }

        sessionDAO.checkUserBelongsToSession(uid, sessionId)
        .then(belongs => {
            if (!belongs){
                Promise.reject('User does not belong to session');
            }
            Promise.resolve();
        })
        .then(() => {
            if (nonce != null && objectiveId != null && newProgress != null){
                // metricsDAO.
            }
            else{
                Promise.reject('Required parameter for updating objective was null')
            }
        })
        .catch(error => {
            res.send(new ResponseModel(false, 200, error));
        })

    })
}