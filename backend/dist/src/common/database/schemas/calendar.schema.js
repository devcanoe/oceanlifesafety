"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const calendarSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ["TASK", "SERVICING"],
        required: true
    },
    description: {
        type: String
    },
    title: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    due_date: {
        type: String
    },
    company: {
        type: String
    },
    vessel: {
        type: String
    },
    due_time: {
        type: String
    },
    created_at: {
        type: Date,
        default: function () {
            return Date.now();
        }
    },
    updated_at: {
        type: Date,
        default: function () {
            return Date.now();
        }
    }
});
exports.default = (0, mongoose_1.model)('Calendar', calendarSchema);
