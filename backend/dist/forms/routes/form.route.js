"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const form_controller_1 = __importDefault(require("../controller/form.controller"));
const authorization_middleware_1 = __importDefault(require("../../common/middleware/authorization.middleware"));
const formRouter = (0, express_1.Router)();
const formController = tsyringe_1.container.resolve(form_controller_1.default);
formRouter.post('/create-eepd', authorization_middleware_1.default, (req, res) => formController.createEEBD(req, res));
formRouter.post('/create-bacl', authorization_middleware_1.default, (req, res) => formController.createBACL(req, res));
formRouter.post('/create-pfecl', authorization_middleware_1.default, (req, res) => formController.createPFECL(req, res));
formRouter.get('/company/:company', authorization_middleware_1.default, (req, res) => formController.getForms(req, res));
formRouter.get('/one/:id', authorization_middleware_1.default, (req, res) => formController.getForm(req, res));
formRouter.delete('/:id', authorization_middleware_1.default, (req, res) => formController.deleteForm(req, res));
formRouter.patch('/:id', authorization_middleware_1.default, (req, res) => formController.updateForm(req, res));
exports.default = formRouter;
