"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const raft_controller_1 = __importDefault(require("../controller/raft.controller"));
const authorization_middleware_1 = __importDefault(require("../../common/middleware/authorization.middleware"));
const raftRouter = (0, express_1.Router)();
const raftController = tsyringe_1.container.resolve(raft_controller_1.default);
raftRouter.post('/create', authorization_middleware_1.default, (req, res) => raftController.createRaft(req, res));
raftRouter.delete('/:id', authorization_middleware_1.default, (req, res) => raftController.deleteRaft(req, res));
raftRouter.get('/:id', authorization_middleware_1.default, (req, res) => raftController.getRafts(req, res));
raftRouter.get('/view/:id', authorization_middleware_1.default, (req, res) => raftController.getRaft(req, res));
raftRouter.patch('/:id', authorization_middleware_1.default, (req, res) => raftController.updateRaft(req, res));
exports.default = raftRouter;
