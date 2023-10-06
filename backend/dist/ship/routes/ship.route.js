"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const ship_controller_1 = __importDefault(require("../controller/ship.controller"));
const authorization_middleware_1 = __importDefault(require("../../common/middleware/authorization.middleware"));
const shipRouter = (0, express_1.Router)();
const shipController = tsyringe_1.container.resolve(ship_controller_1.default);
shipRouter.post('/create', authorization_middleware_1.default, (req, res) => shipController.createShip(req, res));
shipRouter.get('/:id', authorization_middleware_1.default, (req, res) => shipController.fetchShip(req, res));
shipRouter.get('/company/:company', authorization_middleware_1.default, (req, res) => shipController.fetchShips(req, res));
shipRouter.delete('/:id', authorization_middleware_1.default, (req, res) => shipController.deleteShip(req, res));
shipRouter.patch('/:id', authorization_middleware_1.default, (req, res) => shipController.updateShip(req, res));
exports.default = shipRouter;
