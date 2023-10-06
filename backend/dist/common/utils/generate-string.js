"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReference = void 0;
const uuid_1 = require("uuid");
const generateReference = (prefix) => {
    const generateref = (0, uuid_1.v4)();
    return `${prefix}-${generateref}`;
};
exports.generateReference = generateReference;
