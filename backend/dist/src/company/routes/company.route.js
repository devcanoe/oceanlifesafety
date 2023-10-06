"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const company_controller_1 = __importDefault(require("../controller/company.controller"));
const authorization_middleware_1 = __importDefault(require("../../common/middleware/authorization.middleware"));
const companyRouter = (0, express_1.Router)();
const companyController = tsyringe_1.container.resolve(company_controller_1.default);
companyRouter.post('/create', authorization_middleware_1.default, (req, res, next) => companyController.createCompany(req, res, next));
companyRouter.get('/:id', authorization_middleware_1.default, (req, res, next) => companyController.fetchCompany(req, res, next));
companyRouter.get('/', authorization_middleware_1.default, (req, res, next) => companyController.fetchCompanies(req, res, next));
companyRouter.delete('/:id', authorization_middleware_1.default, (req, res, next) => companyController.deleteCompany(req, res, next));
companyRouter.patch('/:id', authorization_middleware_1.default, (req, res, next) => companyController.updateCompany(req, res, next));
exports.default = companyRouter;
