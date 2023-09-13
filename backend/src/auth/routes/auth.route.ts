import { Router } from "express";
import { container } from 'tsyringe';
import AuthController from "../controller/auth.controller";

const authRouter = Router();
const authController = container.resolve(AuthController);

// routes for ticket types
authRouter.post('/login', (req, res, next)=>authController.login(req, res, next));
authRouter.post('/register', (req, res, next)=>authController.register(req, res, next));

export default authRouter

const dashboardRouter = Router();

// routes for ticket types
dashboardRouter.get('/', (req, res, next)=>authController.dashboard(req, res, next));

export {dashboardRouter}