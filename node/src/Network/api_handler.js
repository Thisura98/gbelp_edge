const express = require('express');

/**
 * Handler for API calls
 * @param {Express.Express} app Express.js App
 */
function handle(app){
    app.post('/api/test', (req, res) => {
        res.json({message: "Welcome from Node!", status: "ok!"});
    });
}

module.exports.handle = handle;