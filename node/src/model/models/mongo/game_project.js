const mongoose = require('mongoose');

// MARK: Schema Definitions

const gameResourceSchema = new mongoose.Schema({
    id: String,
    filename: String,
    type: String
});

const gameProjectSchema = new mongoose.Schema({
    resources: [gameResourceSchema]
});

module.exports = gameProjectSchema;