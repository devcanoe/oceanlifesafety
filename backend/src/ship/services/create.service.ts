import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import ShipRepository from "../../common/database/repository/ship.repository";
import LogRepository from "../../common/database/repository/log.repository";
import { BadRequestError } from "../../common/error/badrequest.error";

@injectable()
export default class CreateShipService implements IService<Request, Response, NextFunction> {
    constructor(
        private shipRepository: ShipRepository,
        private logRepository: LogRepository,
        private httpHelper: Http
    ){

    }

    async execute(req: Request, res: Response, next: NextFunction){
        try{
        
            const {
                name,
                user
            } = req.body;

            const company = await this.shipRepository.fetchOneData({name});

            if(company){
                throw new BadRequestError("Ship name already taken");
            }

            const createCompany = await this.shipRepository.addData(req.body);

            await this.logRepository.addData({
                description: `${user.email} created ${createCompany.name} ship`,
                user: user._id
            });

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully create ship",
                data: createCompany
            })
 
        }catch(err: any){
            next(err)
        }
    }
}