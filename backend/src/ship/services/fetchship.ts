import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import ShipRepository from "../../common/database/repository/ship.repository";

@injectable()
export default class FetchShipService implements IService<Request, Response, NextFunction> {
    constructor(
        private shipRepository: ShipRepository,
        private httpHelper: Http
    ){

    }

    async execute(req: Request, res: Response, next: NextFunction){
        try{
        
            const { id } = req.params;

            const data = await this.shipRepository.fetchOneData({_id: id});

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully fetch ship",
                data
            })
 
        }catch(err: any){
            next(err)
        }
    }
}