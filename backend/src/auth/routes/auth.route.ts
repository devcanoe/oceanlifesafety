import { Router } from "express";
import { container } from 'tsyringe';
import AuthController from "../controller/auth.controller";

const authRouter = Router();
const authController = container.resolve(AuthController);

// routes for ticket types
authRouter.post('/login', (req, res)=>authController.login(req, res));
authRouter.post('/register', (req, res)=>authController.register(req, res));

export default authRouter

const dashboardRouter = Router();

// routes for ticket types
dashboardRouter.get('/', (req, res)=>authController.dashboard(req, res));

export {dashboardRouter}