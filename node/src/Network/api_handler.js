const express = require('express');

const { ResponseModel } = require('../model/models/common');
const apiPrefix = 'api'

const statusCodes = { 
    missingAuth: 406,
    missingCapabilities: 403,
    tokenExpired: 401
}

/**
 * Handler for API calls
 * @param {express.Express} app Express.js App
 */
function handle(app){
    // WORKS!
    // Authorization Middleware (faux) for API calls
    app.use(`/${apiPrefix}`, (req, res, next) => {
        if (req.rawHeaders.includes('auth')){
            next();
        }
        else{
            res.sendStatus(statusCodes.missingAuth);
        }
    });

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
        res.json(new ResponseModel(true, 200, "Not implemented yet", null))
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
 * Returns the full API URL 
 * @param {string} $suffix 
 */
function aurl(suffix){
    return `/${apiPrefix}/${suffix}`;
}

module.exports.handle = handle;