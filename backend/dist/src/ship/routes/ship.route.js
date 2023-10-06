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
shipRouter.post('/create', authorization_middleware_1.default, (req, res, next) => shipController.createShip(req, res, next));
shipRouter.get('/:id', authorization_middleware_1.default, (req, res, next) => shipController.fetchShip(req, res, next));
shipRouter.get('/company/:company', authorization_middleware_1.default, (req, res, next) => shipController.fetchShips(req, res, next));
shipRouter.delete('/:id', authorization_middleware_1.default, (req, res, next) => shipController.deleteShip(req, res, next));
shipRouter.patch('/:id', authorization_middleware_1.default, (req, res, next) => shipController.updateShip(req, res, next));
exports.default = shipRouter;
