import { Router } from "express";
import { container } from 'tsyringe';
import CompanyController from "../controller/company.controller";
import userAuth from "../../common/middleware/authorization.middleware";

const companyRouter = Router();
const companyController = container.resolve(CompanyController);

companyRouter.post('/create', userAuth, (req, res)=>companyController.createCompany(req, res));
companyRouter.get('/:id', userAuth, (req, res)=>companyController.fetchCompany(req, res));
companyRouter.get('/', userAuth, (req, res)=>companyController.fetchCompanies(req, res));
companyRouter.delete('/:id', userAuth, (req, res)=>companyController.deleteCompany(req, res));
companyRouter.patch('/:id', userAuth, (req, res)=>companyController.updateCompany(req, res));

export default companyRouter