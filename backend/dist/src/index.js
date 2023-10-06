"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const server_config_1 = require("./common/config/server.config");
require('dotenv').config();
//Start server 
(0, server_config_1.startServer)(app_1.default);
