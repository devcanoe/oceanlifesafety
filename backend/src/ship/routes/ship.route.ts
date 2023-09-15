import { Router } from "express";
import { container } from 'tsyringe';
import ShipController from "../controller/ship.controller";
import userAuth from "../../common/middleware/authorization.middleware";

const shipRouter = Router();
const shipController = container.resolve(ShipController);

shipRouter.post('/create', userAuth, (req, res, next)=>shipController.createShip(req, res, next));
shipRouter.get('/:id', userAuth, (req, res, next)=>shipController.fetchShip(req, res, next));
shipRouter.get('/company/:company', userAuth, (req, res, next)=>shipController.fetchShips(req, res, next));
shipRouter.delete('/:id', userAuth, (req, res, next)=>shipController.deleteShip(req, res, next));
shipRouter.patch('/:id', userAuth, (req, res, next)=>shipController.updateShip(req, res, next));

export default shipRouter