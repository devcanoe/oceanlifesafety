"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopServer = exports.startServer = void 0;
const database_helper_1 = __importDefault(require("../helper/database.helper"));
const tsyringe_1 = require("tsyringe");
const dataBase = tsyringe_1.container.resolve(database_helper_1.default);
const startServer = (app) => {
    try {
        dataBase.connect();
        const port = process.env.PORT || "5000";
        app.listen(port, () => { console.log(`listening to port ${port}`); });
    }
    catch (error) {
        console.log(error);
    }
};
exports.startServer = startServer;
const stopServer = () => {
    dataBase.disconnect();
};
exports.stopServer = stopServer;
