const mongoose = require('mongoose');
const schema_game_project = require('../../../model/models/mongo/game_project');

// MARK: Model Definitions

const GameProject = mongoose.model('GameProject', schema_game_project);

module.exports.GameProject = GameProject;