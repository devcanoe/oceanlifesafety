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
formRouter.post('/create-eepd', authorization_middleware_1.default, (req, res, next) => formController.createEEBD(req, res, next));
formRouter.post('/create-bacl', authorization_middleware_1.default, (req, res, next) => formController.createBACL(req, res, next));
formRouter.post('/create-pfecl', authorization_middleware_1.default, (req, res, next) => formController.createPFECL(req, res, next));
formRouter.get('/company/:company', authorization_middleware_1.default, (req, res, next) => formController.getForms(req, res, next));
formRouter.get('/one/:id', authorization_middleware_1.default, (req, res, next) => formController.getForm(req, res, next));
formRouter.delete('/:id', authorization_middleware_1.default, (req, res, next) => formController.deleteForm(req, res, next));
formRouter.patch('/:id', authorization_middleware_1.default, (req, res, next) => formController.updateForm(req, res, next));
exports.default = formRouter;
