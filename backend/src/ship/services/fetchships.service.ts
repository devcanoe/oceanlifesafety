import { injectable } from "tsyringe";
import { Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import ShipRepository from "../../common/database/repository/ship.repository";

@injectable()
export default class FetchShipsService implements IService<Request, Response> {
    constructor(
        private shipRepository: ShipRepository,
        private httpHelper: Http
    ){

    }

    async execute(req: Request, res: Response){
        try{
        
            const { company } = req.params;

            const data = await this.shipRepository.fetchData({company});

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully fetch ships",
                data
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