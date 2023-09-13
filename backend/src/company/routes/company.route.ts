import { Router } from "express";
import { container } from 'tsyringe';
import CompanyController from "../controller/company.controller";
import userAuth from "../../common/middleware/authorization.middleware";

const companyRouter = Router();
const companyController = container.resolve(CompanyController);

companyRouter.post('/create', userAuth, (req, res, next)=>companyController.createCompany(req, res, next));
companyRouter.get('/:id', userAuth, (req, res, next)=>companyController.fetchCompany(req, res, next));
companyRouter.get('/', userAuth, (req, res, next)=>companyController.fetchCompanies(req, res, next));
companyRouter.delete('/:id', userAuth, (req, res, next)=>companyController.deleteCompany(req, res, next));
companyRouter.patch('/:id', userAuth, (req, res, next)=>companyController.updateCompany(req, res, next));

export default companyRouter