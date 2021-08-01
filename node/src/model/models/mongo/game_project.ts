import { Schema } from 'mongoose';
import { Level } from '../../../../../commons/src/models/game/levels';

// MARK: Schema Definitions

export const gameResourceSchema = new Schema({
    id: String,
    filename: String,
    displayName: String,
    type: String
});

/**
 * POINTS: 
 * 
 * `exitCriteriaValue` and `exitCriteriaType` are logically tied.
 */
// export const gameLevelSchema = new Schema({
//     name: String,
//     type: String,
//     locked: Boolean,
//     displayMode: String,
//     exitCriteriaType: String,
//     exitCriteriaValue: String,
// });

// export const gameLevelSchema = 

// export const gameProjectSchema = new Schema({
//     resources: [gameResourceSchema],
//     levels: [gameLevelSchema]
// });