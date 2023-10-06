"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fileSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["PO", "WAYBILL", "CERTIFICATE"]
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
