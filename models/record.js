const { Schema, model } = require("mongoose");
import mongoose from 'mongoose';

const recordSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    salary: {
        type: String || Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    sub_department: {
        type: String,
        required: true,
    },
    on_contract: {
        type: Boolean,
        required: false,
    },
});

export const RecordModel = mongoose.models.Record || model("Record", recordSchema);