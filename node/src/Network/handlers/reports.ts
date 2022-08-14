import { Express } from "express";
import { aurl } from '../api_handler';
import { isEmptyParam } from '../../util/utils';
import { ResponseModel } from '../../model/models/common';
import * as sessionDAO from '../../model/dao/session';
import { processUsage } from "../../model/processors/usage.processor";
import { GameSession } from "../../../../commons/src/models/session";

export function handlerReports(app: Express){

    // Check for missing sessionId, userId, then
    // Check user permission in session
    app.use(aurl('reports/*'), async (req, res, next) => {
        const sessionId = req.query.sessionId as string;
        const userId = req.header('uid')!;

        if (isEmptyParam(sessionId)){
            res.send(new ResponseModel(false, 200, 'Session ID missing from Request'));
            return;
        }

        if (isEmptyParam(userId)){
            res.send(new ResponseModel(false, 200, 'User ID missing from request'));
            return;
        }

        sessionDAO.checkUserBelongsToSession(userId, sessionId)
        .then(belongs => {
            if (belongs){
                next();
            }
            else{
                res.send(new ResponseModel(false, 200, 'User does not belong to session'));
            }
        })
        .catch(err => {
            res.send(new ResponseModel(false, 200, err));
        })

    })

    // Student/User usage report graph
    app.get(aurl('reports/usage/graph'), (req, res) => {
        const sessionId = req.query.sessionId as string;
        let session: GameSession | undefined;
        
        sessionDAO.getSession(sessionId)
        .then(rawSession => {
            session = rawSession as GameSession;
            return sessionDAO.getUserUsageGroupedByNonce(sessionId);
        })
        .then(usageData => {
            return processUsage(session!, usageData);
        })
        .then(output => {
            res.send(new ResponseModel(true, 200, 'Processed usage data', output));
        })
        .catch(err => {
            res.send(new ResponseModel(false, 200, err));
        })
    });

    // Student/User usage breakdown
    app.get(aurl('reports/usage/breakdown'), (req, res) => {
        const sessionId = req.query.sessionId as string;
        const startTimestamp = req.query.startTimestamp as string || '';
        const endTimestamp = req.query.endTimestamp as string || '';

        sessionDAO.getUserUsageBreakdown(sessionId, startTimestamp, endTimestamp)
        .then(result => {
            res.send(new ResponseModel(true, 200, 'User usage breakdown in seconds', result));
        })
        .catch(err => {
            res.send(new ResponseModel(false, 200, err));
        })
    });
}