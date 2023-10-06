"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ItemController_1 = __importDefault(require("../controllers/ItemController"));
const tsyringe_1 = require("tsyringe");
const itemRouter = (0, express_1.Router)();
const itemController = tsyringe_1.container.resolve(ItemController_1.default);
itemRouter.get('/', (req, res) => itemController.getAllItem(req, res));
itemRouter.get('/:id', (req, res) => itemController.getItem(req, res));
itemRouter.post('/create', (req, res) => itemController.createItem(req, res));
itemRouter.patch('/:id', (req, res) => itemController.updateItem(req, res));
itemRouter.delete('/:id', (req, res) => itemController.deleteItem(req, res));
exports.default = itemRouter;
