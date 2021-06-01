const express = require('express');
const usersDAO = require('../model/dao/users');

const { ResponseModel } = require('../model/models/common');
const apiPrefix = 'api'

const statusCodes = { 
    serverError: 500,
    missingAuth: 400,
    authIdNoMatch: 406,
    missingCapabilities: 403,
    tokenExpired: 401
}

/**
 * Handler for API calls
 * @param {express.Express} app Express.js App
 */
function handle(app){
    // Authorization Middleware (faux) for API calls
    app.use(`/${apiPrefix}`, apiAuthorizationMiddleware);

    app.post(aurl('test'), (req, res) => {
        res.json(new ResponseModel(true, 200, "", null))
    });

    app.post(aurl('auth-token'), (req, res) => {
        res.json(new ResponseModel(true, 200, "Not implemented yet", null))
    });

    app.post(aurl('create-user'), (req, res) => {
        // todo
        // Check headers
        // if header 
        const obj = new ResponseModel(true, 200, "Not implemented yet", null);
        console.log(JSON.stringify(obj));
        res.json(obj)
    });

    // Fallbacks

    app.post(`/${apiPrefix}/*`, (req, res) => {
        res.redirect('/');
    });

    app.post(`/${apiPrefix}`, (req, res) => {
        res.redirect('/');
    });
}

/**
 * Authorize API requests
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
function apiAuthorizationMiddleware(req, res, next) {
    if (req.url == aurl('create-user')){
        next();
    }
    else{
        const authOk = req.rawHeaders.includes('auth');
        const userIdOk = req.rawHeaders.includes('uid');
        if (authOk && userIdOk){
            const auth = req.header('auth');
            const userId = req.header('uid');
            usersDAO.isTokenValidForUser(userId, auth, (lookupResult) => {
                switch(lookupResult){
                case 2:
                    next()
                    break;
                case -2:
                    res.sendStatus(statusCodes.tokenExpired)
                    break;
                case -1:
                    res.sendStatus(statusCodes.authIdNoMatch);
                    break;
                default:
                    res.sendStatus(statusCodes.serverError);
                }
            });
        }
        else{
            res.sendStatus(statusCodes.missingAuth);
        }
    }
}

/**
 * Returns the full API URL 
 * @param {string} $suffix 
 */
function aurl(suffix){
    return `/${apiPrefix}/${suffix}`;
}

module.exports.handle = handle;