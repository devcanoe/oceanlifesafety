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
raftRouter.post('/create', authorization_middleware_1.default, (req, res, next) => raftController.createRaft(req, res, next));
raftRouter.delete('/:id', authorization_middleware_1.default, (req, res, next) => raftController.deleteRaft(req, res, next));
raftRouter.get('/:id', authorization_middleware_1.default, (req, res, next) => raftController.getRafts(req, res, next));
raftRouter.get('/view/:id', authorization_middleware_1.default, (req, res, next) => raftController.getRaft(req, res, next));
raftRouter.patch('/:id', authorization_middleware_1.default, (req, res, next) => raftController.updateRaft(req, res, next));
exports.default = raftRouter;
