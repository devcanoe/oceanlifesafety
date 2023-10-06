"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formColumnSchema = void 0;
const mongoose_1 = require("mongoose");
exports.formColumnSchema = new mongoose_1.Schema({
    serial_no: {
        type: String
    },
    make: {
        type: String
    },
    location: {
        type: String
    },
    date_hyd_tested: {
        type: Date
    },
    cylinder_condition: {
        type: String
    },
    testing_bar: {
        type: String
    },
    refiling_bar: {
        type: String
    },
    remark: {
        type: String
    },
    kg: {
        type: String
    },
    type: {
        type: String
    },
});
