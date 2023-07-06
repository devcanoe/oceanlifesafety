import { injectable } from "tsyringe";
import { Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import ShipRepository from "../../common/database/repository/ship.repository";

@injectable()
export default class DeleteShipService implements IService<Request, Response> {
    constructor(
        private shipRepository: ShipRepository,
        private httpHelper: Http
    ){

    }

    async execute(req: Request, res: Response){
        try{
        
            const { id } = req.params;

            await this.shipRepository.deleteData(id);

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully delete ship",
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