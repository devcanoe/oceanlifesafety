import { injectable } from "tsyringe";
import { Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import CompanyRepository from "../../common/database/repository/company.repository";

@injectable()
export default class FetchCompaniesService implements IService<Request, Response> {
    constructor(
        private companyRepository: CompanyRepository,
        private httpHelper: Http
    ){

    }

    async execute(req: Request, res: Response){
        try{
        
            const { id } = req.params;

            const data = await this.companyRepository.fetchData({});

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully fetch companies",
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