import { injectable } from "tsyringe";
import { Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import ShipRepository from "../../common/database/repository/ship.repository";

@injectable()
export default class CreateShipService implements IService<Request, Response> {
    constructor(
        private shipRepository: ShipRepository,
        private httpHelper: Http
    ){

    }

    async execute(req: Request, res: Response){
        try{
        
            const {
                name
            } = req.body;

            const company = await this.shipRepository.fetchOneData({name});

            if(company){
                throw(new Error("Ship name already taken"));
            }

            const createCompany = await this.shipRepository.addData(req.body);

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully create ship",
                data: createCompany
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