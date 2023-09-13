import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import CompanyRepository from "../../common/database/repository/company.repository";
import LogRepository from "../../common/database/repository/log.repository";

@injectable()
export default class DeleteCompanyService implements IService<Request, Response, NextFunction> {
    constructor(
        private companyRepository: CompanyRepository,
        private logRepository: LogRepository,
        private httpHelper: Http
    ){

    }

    async execute(req: Request, res: Response, next: NextFunction){
        try{
        
            const { id } = req.params;

            const { user } = req.body;

            await this.companyRepository.deleteData(id);

            await this.logRepository.addData({
                description: `${user.email} deleted company with id ${id}`,
                user: user._id
            });

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully delete company",
            })
 
        }catch(err: any){
            next(err)
        }
    }
}