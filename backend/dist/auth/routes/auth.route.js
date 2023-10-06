"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const authRouter = (0, express_1.Router)();
const authController = tsyringe_1.container.resolve(auth_controller_1.default);
// routes for ticket types
authRouter.post('/login', (req, res) => authController.login(req, res));
authRouter.post('/register', (req, res) => authController.register(req, res));
exports.default = authRouter;
const dashboardRouter = (0, express_1.Router)();
exports.dashboardRouter = dashboardRouter;
// routes for ticket types
dashboardRouter.get('/', (req, res) => authController.dashboard(req, res));
