"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const POController_1 = __importDefault(require("../controllers/POController"));
const tsyringe_1 = require("tsyringe");
const poRouter = (0, express_1.Router)();
const poController = tsyringe_1.container.resolve(POController_1.default);
poRouter.get('/', (req, res) => poController.getPOs(req, res));
poRouter.get('/:id', (req, res) => poController.getPO(req, res));
poRouter.post('/create', (req, res) => poController.uploadPO(req, res));
poRouter.delete('/:id', (req, res) => poController.removePO(req, res));
exports.default = poRouter;
