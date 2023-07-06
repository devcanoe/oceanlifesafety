import { injectable } from "tsyringe";
import { Request, Response } from "express";
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

     async createShip(req: Request, res: Response){
        await this.createShipService.execute(req, res);
    }

    async fetchShip(req: Request, res: Response){
        await this.fetchShipService.execute(req, res);
    }
   
    async fetchShips(req: Request, res: Response){
        await this.fetchShipsService.execute(req, res);
    }

    async deleteShip(req: Request, res: Response){
        await this.deleteShipService.execute(req, res);
    }

    async updateShip(req: Request, res: Response){
        await this.updateShipService.execute(req, res);
    }
}