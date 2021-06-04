const express = require('express');
const sessionsDAO = require('../model/dao/sessions');
const l = require('../util/logger');

const { ResponseModel } = require('../model/models/common');
const apiPrefix = 'edge-api'

/**
 * Handler for Edge Game API calls
 * @param {express.Express} app Express.js App
 */
function handle(app){
    // Authorization Middleware (faux) for API calls
    app.use(`/${apiPrefix}`, apiAuthorizationMiddleware);

    // @DEMO
    app.post(aurl('objectiveUpdate'), (req, res) => {
        // TODO: Move to MongoDB from MySQL
        sessionsDAO.addGameObjectiveHistory(
            req.body.userId, 
            req.body.sessionId, 
            req.body.objectiveId,
            req.body.progress, 
            (status, msg) => {
                l.logc(`game-api: OBJ prog. updated! ${req.body.progress} (${req.body.sessionId}:${req.body.objectiveId})`);
                res.json(new ResponseModel(status, 200, '', null));
        });
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
 * Authorize ALL API requests for now.
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
function apiAuthorizationMiddleware(req, res, next) {
    next();
}

/**
 * Returns the full API URL 
 * @param {string} $suffix 
 */
function aurl(suffix){
    return `/${apiPrefix}/${suffix}`;
}

module.exports.handle = handle;