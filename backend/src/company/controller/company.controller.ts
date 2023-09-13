import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
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

     async createCompany(req: Request, res: Response, next: NextFunction){
        await this.createCompanyService.execute(req, res, next);
    }

    async fetchCompany(req: Request, res: Response, next: NextFunction){
        await this.fetchCompanyService.execute(req, res, next);
    }
   
    async fetchCompanies(req: Request, res: Response, next: NextFunction){
        await this.fetchCompaniesService.execute(req, res, next);
    }

    async deleteCompany(req: Request, res: Response, next: NextFunction){
        await this.deleteCompanyService.execute(req, res, next);
    }

    async updateCompany(req: Request, res: Response, next: NextFunction){
        await this.updateCompanyService.execute(req, res, next);
    }
}