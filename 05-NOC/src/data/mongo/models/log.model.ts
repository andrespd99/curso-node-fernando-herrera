

import mongoose from "mongoose";


const logSchema = new mongoose.Schema({
    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low',
    },
    origin: {
        type: String,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});


export const LogModel = mongoose.model('Log', logSchema);