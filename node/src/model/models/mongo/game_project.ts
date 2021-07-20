import { Schema } from 'mongoose';

// MARK: Schema Definitions

const gameResourceSchema = new Schema({
    id: String,
    filename: String,
    type: String
});

default export const gameProjectSchema = new Schema({
    resources: [gameResourceSchema]
});