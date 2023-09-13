import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import CreateShipService from "../services/create.service";
import DeleteShipService from "../services/deleteship.service";
import FetchShipService from "../services/fetchship";
import FetchShipsService from "../services/fetchships.service";
import UpdateShipService from "../services/updateship.service";

@injectable()
export default class ShipController {
    constructor(
        private createShipService: CreateShipService,
        private fetchShipService: FetchShipService,
        private fetchShipsService: FetchShipsService,
        private deleteShipService: DeleteShipService,
        private updateShipService: UpdateShipService
    ){}

     async createShip(req: Request, res: Response, next: NextFunction){
        await this.createShipService.execute(req, res, next);
    }

    async fetchShip(req: Request, res: Response, next: NextFunction){
        await this.fetchShipService.execute(req, res, next);
    }
   
    async fetchShips(req: Request, res: Response, next: NextFunction){
        await this.fetchShipsService.execute(req, res, next);
    }

    async deleteShip(req: Request, res: Response, next: NextFunction){
        await this.deleteShipService.execute(req, res, next);
    }

    async updateShip(req: Request, res: Response, next: NextFunction){
        await this.updateShipService.execute(req, res, next);
    }
}