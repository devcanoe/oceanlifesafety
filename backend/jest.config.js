"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Sync object
const config = {
    preset: "ts-jest",
    rootDir: '.',
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    "testMatch": [
        "**/*.test.ts"
    ]
};
exports.default = config;
