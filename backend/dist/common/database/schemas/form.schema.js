"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const form_column_schema_1 = require("./form_column.schema");
const formSchema = new mongoose_1.Schema({
    company: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: 'Company',
        required: true
    },
    ship: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: 'Ship',
        required: true
    },
    location_of_vessel: {
        type: String
    },
    service_date: {
        type: Date
    },
    flag_state: {
        type: String
    },
    last_service_date: {
        type: Date
    },
    type: {
        type: String,
        enum: ["EEBD", "BACL", "PFECL"],
        required: true
    },
    specifications: [form_column_schema_1.formColumnSchema],
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
exports.default = mongoose_1.default.model('Form', formSchema);
