import { injectable } from "tsyringe";
import { Request, Response } from "express";
import CreateCompanyService from "../services/create.service";
import FetchCompanyService from "../services/fetchcompany.service";
import FetchCompaniesService from "../services/fetchcompanies.service";
import DeleteCompanyService from "../services/deletecompany.service";
import UpdateCompanyService from "../services/updatecompany.service";

@injectable()
export default class CompanyController {
    constructor(
        private createCompanyService: CreateCompanyService,
        private fetchCompanyService: FetchCompanyService,
        private fetchCompaniesService: FetchCompaniesService,
        private deleteCompanyService: DeleteCompanyService,
        private updateCompanyService: UpdateCompanyService
    ){}

     async createCompany(req: Request, res: Response){
        await this.createCompanyService.execute(req, res);
    }

    async fetchCompany(req: Request, res: Response){
        await this.fetchCompanyService.execute(req, res);
    }
   
    async fetchCompanies(req: Request, res: Response){
        await this.fetchCompaniesService.execute(req, res);
    }

    async deleteCompany(req: Request, res: Response){
        await this.deleteCompanyService.execute(req, res);
    }

    async updateCompany(req: Request, res: Response){
        await this.updateCompanyService.execute(req, res);
    }
}