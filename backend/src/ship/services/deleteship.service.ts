import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import ShipRepository from "../../common/database/repository/ship.repository";
import LogRepository from "../../common/database/repository/log.repository";

@injectable()
export default class DeleteShipService implements IService<Request, Response, NextFunction> {
    constructor(
        private shipRepository: ShipRepository,
        private logRepository: LogRepository,
        private httpHelper: Http
    ){

    }

    async execute(req: Request, res: Response, next: NextFunction){
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
            next(err)
        }
    }
}