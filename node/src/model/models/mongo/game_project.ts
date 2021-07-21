import { Schema } from 'mongoose';

// MARK: Schema Definitions

const gameResourceSchema = new Schema({
    id: String,
    filename: String,
    displayName: String,
    type: String
});

export const gameProjectSchema = new Schema({
    resources: [gameResourceSchema]
});