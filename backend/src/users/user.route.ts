import { Router } from "express";
import { container } from 'tsyringe';
import UserController from "./user.controller";
import userAuth from "../common/middleware/authorization.middleware";

const userRouter = Router();
const userController = container.resolve(UserController);

// routes for ticket types
userRouter.get('/', userAuth, (req, res, next)=> userController.getUsers(req, res, next));
userRouter.get('/:id', userAuth, (req, res, next)=> userController.getUser(req, res, next));
userRouter.delete('/:id', userAuth, (req, res, next)=> userController.deleteUser(req, res, next));
userRouter.post('/create', userAuth, (req, res, next)=> userController.addUser(req, res, next));
userRouter.patch('/', userAuth, (req, res, next)=> userController.updateUser(req, res, next));
userRouter.patch('/changepassword', userAuth, (req, res, next)=> userController.changePassword(req, res, next));

export default userRouter