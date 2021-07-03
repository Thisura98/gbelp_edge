const express = require('express');
const usersDAO = require('../model/dao/users');
const statusCodes = require('./status_codes');

const { ResponseModel } = require('../model/models/common');
const apiPrefix = 'api'

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

    app.get(aurl('user-types'), (req, res) => {
        usersDAO.getDisplayUserTypes((results) => {
            res.json(new ResponseModel(true, 200, "Success", results));
        })
    })

    app.post(aurl('create-user'), (req, res) => {
        usersDAO.createUser(req.body.username, req.body.email, req.body.typeId, req.body.ph, (status, msg, userId, token) => {
            res.json(new ResponseModel(status, 200, msg, { user_id: userId, token: token }));
        });
    });

    app.post(aurl('login'), (req, res) => {
        usersDAO.loginUser(req.body.email, req.body.ph, (status, msg, userId, token) => {
            res.json(new ResponseModel(status, 200, msg, {user_id: userId, token: token}));
        });
    });

    app.get(aurl('user-type-info'), (req, res) => {
        usersDAO.getUserType(req.query.userId, (status, msg, objOrNull) => {
            res.json(new ResponseModel(status, 200, msg, objOrNull));
        })
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
 * Authorize API requests with (auth + uid) headers
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
function apiAuthorizationMiddleware(req, res, next) {

    const routeURL = req.originalUrl;
    const safeURLs = ['create-user', 'user-types', 'login'].map((v, i, m) => aurl(v));
    if (safeURLs.find((url, _, __) => url == routeURL)){
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