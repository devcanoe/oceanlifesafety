import { injectable } from "tsyringe";
import { Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import ShipRepository from "../../common/database/repository/ship.repository";
import LogRepository from "../../common/database/repository/log.repository";

@injectable()
export default class DeleteShipService implements IService<Request, Response> {
    constructor(
        private shipRepository: ShipRepository,
        private logRepository: LogRepository,
        private httpHelper: Http
    ){

    }

    async execute(req: Request, res: Response){
        try{
        
            const { id } = req.params;

            const { user } = req.body;

            await this.shipRepository.deleteData(id);

            await this.logRepository.addData({
                description: `${user.email} deleted ${id} ship`,
                user: user._id
            });

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