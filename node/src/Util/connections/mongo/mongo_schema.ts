import { model } from 'mongoose';

import { gameProjectSchema } from '../../../model/models/mongo/game_project';

// MARK: Model Definitions

export const GameProject = model('GameProject', gameProjectSchema);