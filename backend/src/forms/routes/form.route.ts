import { Router } from "express";
import { container } from 'tsyringe';
import FormController from "../controller/form.controller";
import userAuth from "../../common/middleware/authorization.middleware";

const formRouter = Router();
const formController = container.resolve(FormController);

formRouter.post('/create-eepd', userAuth, (req, res)=>formController.createEEBD(req, res));
formRouter.post('/create-bacl', userAuth, (req, res)=>formController.createBACL(req, res));
formRouter.post('/create-pfecl', userAuth, (req, res)=>formController.createPFECL(req, res));
formRouter.get('/:company', userAuth, (req, res)=>formController.getForms(req, res));
formRouter.delete('/:id', userAuth, (req, res)=>formController.deleteForm(req, res));

export default formRouter;