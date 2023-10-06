"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RaftController_1 = __importDefault(require("../controllers/RaftController"));
const tsyringe_1 = require("tsyringe");
const raftRouter = (0, express_1.Router)();
const raftController = tsyringe_1.container.resolve(RaftController_1.default);
raftRouter.get('/:ship', (req, res) => raftController.getAllRaft(req, res));
raftRouter.get('/:ship', (req, res) => raftController.getRaft(req, res));
raftRouter.post('/create', (req, res) => raftController.createRaft(req, res));
raftRouter.patch('/:id', (req, res) => raftController.updateRaft(req, res));
raftRouter.delete('/:id', (req, res) => raftController.deleteRaft(req, res));
exports.default = raftRouter;
