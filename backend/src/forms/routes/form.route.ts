import { Router } from "express";
import { container } from 'tsyringe';
import FormController from "../controller/form.controller";

const formRouter = Router();
const formController = container.resolve(FormController);

formRouter.post('/create-eepd', (req, res)=>formController.createEEBD(req, res));
formRouter.post('/create-bacl', (req, res)=>formController.createBACL(req, res));
formRouter.post('/create-pfecl', (req, res)=>formController.createPFECL(req, res));

export default formRouter;