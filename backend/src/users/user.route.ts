import { Router } from "express";
import { container } from 'tsyringe';
import UserController from "./user.controller";
import userAuth from "../common/middleware/authorization.middleware";

const userRouter = Router();
const userController = container.resolve(UserController);

// routes for ticket types
userRouter.post('/', userAuth, (req, res, next)=> userController.getUser(req, res, next));

export default userRouter