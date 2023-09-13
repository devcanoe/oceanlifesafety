import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import CompanyRepository from "../../common/database/repository/company.repository";
import LogRepository from "../../common/database/repository/log.repository";

@injectable()
export default class UpdateCompanyService implements IService<Request, Response, NextFunction> {
    constructor(
        private companyRepository: CompanyRepository,
        private logRepository: LogRepository,
        private httpHelper: Http
    ){}

    async execute(req: Request, res: Response, next: NextFunction){
        try{
        
            const { id } = req.params;

            const { user } = req.body;
          
            const updateCompany = await this.companyRepository.updateData({_id: id}, req.body);

            await this.logRepository.addData({
                description: `${user.email} updated Company (${updateCompany.name}) details`,
                user: user.id
            });

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully update company",
                data: updateCompany
            })
 
        }catch(err: any){
            next(err)
        }
    }
}