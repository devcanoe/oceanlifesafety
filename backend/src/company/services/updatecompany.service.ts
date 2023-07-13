import { injectable } from "tsyringe";
import { Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import CompanyRepository from "../../common/database/repository/company.repository";
import LogRepository from "../../common/database/repository/log.repository";

@injectable()
export default class UpdateCompanyService implements IService<Request, Response> {
    constructor(
        private companyRepository: CompanyRepository,
        private logRepository: LogRepository,
        private httpHelper: Http
    ){}

    async execute(req: Request, res: Response){
        try{
        
            const { id } = req.params;

            const { user } = req.body;

            const updateCompany = await this.companyRepository.updateData({_id: id}, req.body);

            await this.logRepository.addData({
                description: `${user.email} updated ${updateCompany.name} details`,
                user: user._id
            });

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully update company",
                data: updateCompany
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