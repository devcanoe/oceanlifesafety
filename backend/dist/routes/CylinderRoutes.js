"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CylinderController_1 = __importDefault(require("../controllers/CylinderController"));
const tsyringe_1 = require("tsyringe");
const cylinderRouter = (0, express_1.Router)();
const cylinderController = tsyringe_1.container.resolve(CylinderController_1.default);
cylinderRouter.get('/', (req, res) => cylinderController.getAllCylinder(req, res));
cylinderRouter.get('/:id', (req, res) => cylinderController.getCylinder(req, res));
cylinderRouter.post('/create', (req, res) => cylinderController.createCylinder(req, res));
cylinderRouter.patch('/:id', (req, res) => cylinderController.updateCylinder(req, res));
cylinderRouter.delete('/:id', (req, res) => cylinderController.deleteCylinder(req, res));
exports.default = cylinderRouter;
