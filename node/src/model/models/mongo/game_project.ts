import { Schema } from 'mongoose';

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
export const gameLevelSchema = new Schema({
    name: String,
    type: String,
    displayMode: String,
    exitCriteriaType: String,
    exitCriteriaValue: String,
});

export const gameProjectSchema = new Schema({
    resources: [gameResourceSchema],
    levels: [gameLevelSchema]
});