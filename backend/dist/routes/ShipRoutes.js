"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ShipController_1 = __importDefault(require("../controllers/ShipController"));
const tsyringe_1 = require("tsyringe");
const shipRouter = (0, express_1.Router)();
const shipController = tsyringe_1.container.resolve(ShipController_1.default);
shipRouter.get('/', (req, res) => shipController.getAllShip(req, res));
shipRouter.get('/:client', (req, res) => shipController.getShip(req, res));
shipRouter.post('/create', (req, res) => shipController.createShip(req, res));
shipRouter.patch('/:id', (req, res) => shipController.updateShip(req, res));
shipRouter.delete('/:id', (req, res) => shipController.deleteShip(req, res));
exports.default = shipRouter;
