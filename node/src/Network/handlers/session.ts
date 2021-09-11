import { Express } from 'express';
import { aurl } from '../api_handler';
import * as sessionDAO from '../../model/dao/session';
import * as playDAO from '../../model/dao/play';
import { ResponseModel } from '../../model/models/common';

export function handlerSession(app: Express){

    app.post(aurl('create-session'), (req, res) => {
        const typeId = req.body.typeId;
        const state = req.body.state;
        const gameId = req.body.gameEntryId;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;
        const users: string[] = req.body.insertUsers ?? [];
        sessionDAO.createSession(typeId, state, gameId, startTime, endTime, users).then((sessionId) => {
            return sessionDAO.getSession(sessionId);
        }).then((session) => {
            res.send(new ResponseModel(true, 200, 'Created and retrieved session', session));
        }).catch((error) => {
            res.send(new ResponseModel(false, 200, error));
        });
    });

    app.post(aurl('create-test-session'), (req, res) => {
        const userId = req.header('uid')!;
        const gameId = req.body.gameId;
        playDAO.createTestSession(userId, gameId).then(result => {
            res.send(new ResponseModel(true, 200, 'Group ID and Session ID retrieved for test session', result))
        }).catch(error => {
            res.send(new ResponseModel(false, 200, error, null));
        })
    })

}