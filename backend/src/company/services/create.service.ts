import { injectable } from "tsyringe";
import { Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import CompanyRepository from "../../common/database/repository/company.repository";
import LogRepository from "../../common/database/repository/log.repository";

@injectable()
export default class CreateCompanyService implements IService<Request, Response> {
    constructor(
        private companyRepository: CompanyRepository,
        private logRepository: LogRepository,
        private httpHelper: Http
    ){

    }

    async execute(req: Request, res: Response){
        try{
        
            const {
                name,
                user
            } = req.body;

            const company = await this.companyRepository.fetchOneData({name});

            if(company){
                throw(new Error("Company name already taken"));
            }

            const createCompany = await this.companyRepository.addData(req.body);

            await this.logRepository.addData({
                description: `${user.email} just added ${createCompany.name} to companies`,
                user: user._id
            });

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully create company",
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