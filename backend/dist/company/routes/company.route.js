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
companyRouter.post('/create', authorization_middleware_1.default, (req, res) => companyController.createCompany(req, res));
companyRouter.get('/:id', authorization_middleware_1.default, (req, res) => companyController.fetchCompany(req, res));
companyRouter.get('/', authorization_middleware_1.default, (req, res) => companyController.fetchCompanies(req, res));
companyRouter.delete('/:id', authorization_middleware_1.default, (req, res) => companyController.deleteCompany(req, res));
companyRouter.patch('/:id', authorization_middleware_1.default, (req, res) => companyController.updateCompany(req, res));
exports.default = companyRouter;
