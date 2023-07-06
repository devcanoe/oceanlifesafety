import { Router } from "express";
import { container } from 'tsyringe';
import ShipController from "../controller/ship.controller";
import userAuth from "../../common/middleware/authorization.middleware";

const shipRouter = Router();
const shipController = container.resolve(ShipController);

shipRouter.post('/create', userAuth, (req, res)=>shipController.createShip(req, res));
shipRouter.get('/:id', userAuth, (req, res)=>shipController.fetchShip(req, res));
shipRouter.get('/company/:company', userAuth, (req, res)=>shipController.fetchShips(req, res));
shipRouter.delete('/:id', userAuth, (req, res)=>shipController.deleteShip(req, res));
shipRouter.patch('/:id', userAuth, (req, res)=>shipController.updateShip(req, res));

export default shipRouter