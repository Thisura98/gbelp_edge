const mongoose = require('mongoose');

// MARK: Schema Definitions

const gameProjectSchema = new mongoose.Schema({
    resources: [{
        id: Number,
        name: String,
        filename: String
    }]
});

module.exports = gameProjectSchema;