import { Express } from 'express';
import { aurl } from '../api_handler';
import * as usersDAO from '../../model/dao/users';
import { ResponseModel } from '../../model/models/common';

export function handlerAuth(app: Express){

    app.get(aurl('refresh-token'), (req, res) => {
        // If Auth headers are ok this will be the response for /api/refresh-token.
        // Otherwise, see apiAuthorizationMiddleware function.
        res.json(new ResponseModel(true, 200, "", null));
    });

    app.get(aurl('user-types'), (req, res) => {
        usersDAO.getDisplayUserTypes((results) => {
            res.json(new ResponseModel(true, 200, "Success", results));
        })
    })

    app.post(aurl('create-user'), (req, res) => {
        usersDAO.createUser(req.body.username, req.body.email, req.body.typeId, req.body.ph, (status, msg, userAndToken) => {
            res.json(new ResponseModel(status, 200, msg, userAndToken));
        });
    });

    app.post(aurl('login'), (req, res) => {
        usersDAO.loginUser(req.body.email, req.body.ph, (status, msg, userAndToken) => {
            res.json(new ResponseModel(status, 200, msg, userAndToken));
        });
    });

    app.get(aurl('user-type-info'), (req, res) => {
        usersDAO.getUserType(req.query.userId! as string, (status, msg, objOrNull) => {
            res.json(new ResponseModel(status, 200, msg, objOrNull));
        })
    });

}