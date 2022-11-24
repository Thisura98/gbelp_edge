import { Express } from 'express';
import { aurl } from '../api_handler';
import * as sessionDAO from '../../model/dao/session';
import * as playDAO from '../../model/dao/play';
import { ResponseModel } from '../../model/models/common';
import * as l from '../../Util/logger';

export function handlerSession(app: Express){

    app.post(aurl('create-session'), (req, res) => {
        const typeId = req.body.typeId;
        const state = req.body.state;
        const gameId = req.body.gameEntryId;
        const groupId = req.body.groupId;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;
        const users: string[] = req.body.insertUsers ?? [];
        sessionDAO.createSession(typeId, state, gameId, groupId, startTime, endTime, users).then((sessionId) => {
            return sessionDAO.getSession(sessionId);
        }).then((session) => {
            res.send(new ResponseModel(true, 200, 'Created and retrieved session', session));
        }).catch((error) => {
            res.send(new ResponseModel(false, 200, error));
        });
    });

    app.put(aurl('save-session'), async (req, res) => {
        const sessionId = req.body.sessionId;
        const typeId = req.body.typeId;
        const state = req.body.state;
        const gameId = req.body.gameEntryId;
        const groupId = req.body.groupId;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;
        const userId = req.header('uid')!;

        const belongs = await sessionDAO.checkUserBelongsToSession(userId, sessionId);
        if (belongs){
            sessionDAO.modifySession(
                sessionId,
                typeId,
                state,
                gameId,
                groupId,
                startTime, 
                endTime
            )
            .then(_ => {
                res.send(new ResponseModel(true, 200, 'Saved successfully!', null));
            })
            .catch(err => {
                res.send(new ResponseModel(false, 200, err, null));
            })
        }
        else{
            return Promise.reject("User does not belong to session");
        }
    })

    app.post(aurl('create-test-session'), (req, res) => {
        const userId = req.header('uid')!;
        const gameId = req.body.gameId;
        const compileGame = req.body.compileGame as boolean;
        playDAO.createTestSession(userId, gameId, compileGame).then(result => {
            res.send(new ResponseModel(true, 200, 'Group ID and Session ID retrieved for test session', result))
        }).catch(error => {
            res.send(new ResponseModel(false, 200, error, null));
        })
    })

    app.get(aurl('get-session'), (req, res) => {
        const userId = req.header('uid')!;
        const sessionId = req.query.sessionId as string;

        return sessionDAO.checkUserBelongsToSession(userId, sessionId).then(belongs => {
            if (!belongs){
                return Promise.reject("User does not belong to session")
            }
            return sessionDAO.getSession(sessionId);
        })
        .then(session => {
            res.send(new ResponseModel(true, 200, "Successfully retrieved session", session))
        })
        .catch(err => {
            l.logc(err, 'get-session');
            res.send(new ResponseModel(false, 200, err));
        })
    })

    app.get(aurl('session/sessions-by-group'), (req, res) => {
        const groupId = req.query.groupId as string;
        let filterStates = req.query.states as string[];
        
        // type safety
        if (filterStates === undefined)
            filterStates = [];
        else if (typeof filterStates == 'string')
            filterStates = [filterStates];

        return sessionDAO.getSessionsInGroup(
            groupId, filterStates
        )
        .then(data => {
            res.send(new ResponseModel(true, 200, 'Successfully received groups', data));
        })
        .catch(err => {
            res.send(new ResponseModel(false, 200, err))
        })
    })

}