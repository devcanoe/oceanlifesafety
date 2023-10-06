"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const tsyringe_1 = require("tsyringe");
const authRouter = (0, express_1.Router)();
const authController = tsyringe_1.container.resolve(AuthController_1.default);
authRouter.post('/login', (req, res) => authController.Login(req, res));
authRouter.post('/register', (req, res) => authController.register(req, res));
exports.default = authRouter;
