const mongoose = require('mongoose');
const schema_game_project = require('../../../model/models/mongo/game_project');

// MARK: Model Definitions

module.exports = {
    models: {
        GameProject: new mongoose.model('GameProject', schema_game_project)
    }
};