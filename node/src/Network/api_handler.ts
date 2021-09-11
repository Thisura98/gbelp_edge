import express from 'express';
import * as statusCodes from './status_codes';
import * as usersDAO from '../model/dao/users';
import * as l from '../util/logger';
import * as utils from '../util/utils';
import { encrypt, decrypt } from '../util/crypto';
import { ResponseModel, ResponsePlainModel } from '../model/models/common';
import { handlerAuth } from './handlers/auth';
import { handlerGameEntry } from './handlers/game_entry';
import { handlerGameEditing } from './handlers/game_editing';
import { handlerSession } from './handlers/session';
import { handlerGroups } from './handlers/groups';
import { handlerPlay } from './handlers/play';

const apiPrefix = 'api'


/**
 * Handler for API calls
 * @param {express.Express} app Express.js App
 */
export function handle(app: express.Express){
    // Authorization Middleware (faux) for API calls
    app.use(`/${apiPrefix}`, apiAuthorizationMiddleware);

    handlerAuth(app);
    handlerGameEntry(app);
    handlerGameEditing(app);
    handlerSession(app);
    handlerGroups(app);
    handlerPlay(app);

    // Tests

    app.post(aurl('test'), (req, res) => {
        res.json(new ResponseModel(true, 200, "", null))
    });

    app.post(aurl('crypto/encrypt'), (req, res) => {
        const result = encrypt(req.body.plaintext);
        res.send({
            result: result
        })
    })

    app.post(aurl('crypto/decrypt'), (req, res) => {
        const result = decrypt(req.body.ciphertext);
        res.send({
            result: result
        })
    })

    // Fallbacks

    app.post(`/${apiPrefix}/*`, (req, res) => {
        res.redirect('/');
    });

    app.post(`/${apiPrefix}`, (req, res) => {
        res.redirect('/');
    });
}

/**
 * Authorize API requests with (auth + uid) headers
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export function apiAuthorizationMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const routeURL = req.originalUrl;
    const safeURLs = [
        'create-user', 'user-types', 'login', 'get-objectid', 'crypto/encrypt', 'crypto/decrypt',
        'get-group/anonymous'
    ].map((v, i, m) => {
        const prefixed = aurl(v);
        const regexp = new RegExp(`^${prefixed}`, '');
        return regexp;
    });
    if (safeURLs.find((regex, _, __) => routeURL.search(regex) > -1)){
        next();
    }
    else{
        const authOk = req.rawHeaders.includes('auth');
        const userIdOk = req.rawHeaders.includes('uid');
        if (authOk && userIdOk){
            const auth = req.header('auth');
            const userId = req.header('uid');
            usersDAO.isTokenValidForUser(userId!, auth!, (lookupResult) => {
                switch(lookupResult){
                case 2:
                    next()
                    break;
                case -2:
                    res.sendStatus(statusCodes.errorCodes.tokenExpired)
                    break;
                case -1:
                    res.sendStatus(statusCodes.errorCodes.authIdNoMatch);
                    break;
                default:
                    res.sendStatus(statusCodes.errorCodes.serverError);
                }
            });
        }
        else{
            res.sendStatus(statusCodes.errorCodes.missingAuth);
        }
    }
}

/**
 * Returns the full API URL 
 * @param {string} $suffix 
 */
export function aurl(suffix: string){
    return `/${apiPrefix}/${suffix}`;
}