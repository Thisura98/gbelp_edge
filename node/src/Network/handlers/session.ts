import { Express } from 'express';
import { aurl } from '../api_handler';
import * as sessionDAO from '../../model/dao/session';
import * as playDAO from '../../model/dao/play';
import { ResponseModel } from '../../model/models/common';

export function handlerSession(app: Express){

    app.post(aurl('create-session'), (req, res) => {
        const typeId = req.body.typeId;
        const state = req.body.state;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;
        sessionDAO.createSession(typeId, state, startTime, endTime).then((sessionId) => {
            return sessionDAO.getSession(sessionId);
        }).then((session) => {
            res.send(new ResponseModel(true, 200, 'Created and retrieved session', session));
        }).catch((error) => {
            res.send(new ResponseModel(false, 200, error));
        });
    });

}