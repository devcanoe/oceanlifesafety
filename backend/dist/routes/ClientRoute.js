"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClientController_1 = __importDefault(require("../controllers/ClientController"));
const tsyringe_1 = require("tsyringe");
const clientRouter = (0, express_1.Router)();
const clientController = tsyringe_1.container.resolve(ClientController_1.default);
clientRouter.get('/', (req, res) => clientController.getAllClient(req, res));
clientRouter.get('/:id', (req, res) => clientController.getClient(req, res));
clientRouter.post('/create', (req, res) => clientController.createClient(req, res));
clientRouter.patch('/:id', (req, res) => clientController.updateClient(req, res));
clientRouter.delete('/:id', (req, res) => clientController.deleteClient(req, res));
exports.default = clientRouter;
