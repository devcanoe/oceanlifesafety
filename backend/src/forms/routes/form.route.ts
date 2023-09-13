import { Router } from "express";
import { container } from 'tsyringe';
import FormController from "../controller/form.controller";
import userAuth from "../../common/middleware/authorization.middleware";

const formRouter = Router();
const formController = container.resolve(FormController);

formRouter.post('/create-eepd', userAuth, (req, res, next)=>formController.createEEBD(req, res, next));
formRouter.post('/create-bacl', userAuth, (req, res, next)=>formController.createBACL(req, res, next));
formRouter.post('/create-pfecl', userAuth, (req, res, next)=>formController.createPFECL(req, res, next));
formRouter.get('/company/:company', userAuth, (req, res, next)=>formController.getForms(req, res, next));
formRouter.get('/one/:id', userAuth, (req, res, next)=>formController.getForm(req, res, next));
formRouter.delete('/:id', userAuth, (req, res, next)=>formController.deleteForm(req, res, next));
formRouter.patch('/:id', userAuth, (req, res, next)=>formController.updateForm(req, res, next));

export default formRouter;