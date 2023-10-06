"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WaybillController_1 = __importDefault(require("../controllers/WaybillController"));
const tsyringe_1 = require("tsyringe");
const waybillRouter = (0, express_1.Router)();
const waybillController = tsyringe_1.container.resolve(WaybillController_1.default);
waybillRouter.get('/', (req, res) => waybillController.getWaybills(req, res));
waybillRouter.get('/:id', (req, res) => waybillController.getWaybill(req, res));
waybillRouter.post('/create', (req, res) => waybillController.uploadWaybill(req, res));
waybillRouter.delete('/:id', (req, res) => waybillController.removeWaybill(req, res));
exports.default = waybillRouter;
