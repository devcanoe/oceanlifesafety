import { Router } from "express";
import { container } from 'tsyringe';
import FormController from "../controller/form.controller";

const formRouter = Router();
const formController = container.resolve(FormController);

formRouter.post('/create-eepd', (req, res)=>formController.createEEBD(req, res));

export default formRouter;