// const express = require('express');
// const l = require('../util/logger');

// const { ResponseModel } = require('../model/models/common');
// const apiPrefix = 'edge-api'

// /**
//  * Handler for Edge Game API calls
//  * @param {express.Express} app Express.js App
//  */
// function handle(app){
//     // Authorization Middleware (faux) for API calls
//     app.use(`/${apiPrefix}`, apiAuthorizationMiddleware);


//     // Fallbacks

//     app.post(`/${apiPrefix}/*`, (req, res) => {
//         res.redirect('/');
//     });

//     app.post(`/${apiPrefix}`, (req, res) => {
//         res.redirect('/');
//     });
// }

// /**
//  * Authorize ALL API requests for now.
//  * @param {express.Request} req 
//  * @param {express.Response} res 
//  * @param {express.NextFunction} next 
//  */
// function apiAuthorizationMiddleware(req, res, next) {
//     next();
// }

// /**
//  * Returns the full API URL 
//  * @param {string} $suffix 
//  */
// function aurl(suffix){
//     return `/${apiPrefix}/${suffix}`;
// }

// module.exports.handle = handle;