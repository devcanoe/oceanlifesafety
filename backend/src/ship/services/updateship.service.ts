import { injectable } from "tsyringe";
import { Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import ShipRepository from "../../common/database/repository/ship.repository";

@injectable()
export default class UpdateShipService implements IService<Request, Response> {
    constructor(
        private shipRepository: ShipRepository,
        private httpHelper: Http
    ){}

    async execute(req: Request, res: Response){
        try{
        
            const { id } = req.params;

            const updateShip = await this.shipRepository.updateData({_id: id}, req.body);

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully update ship",
                data: updateShip
            })
 
        }catch(err: any){
            this.httpHelper.Response({
                res,
                status: "error",
                message: err.message
            })
        }
    }
}