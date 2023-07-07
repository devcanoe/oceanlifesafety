import { injectable } from "tsyringe";
import { Request, Response } from "express";
import CreateEEPDService from "../services/create_eepd.service";
import CreateBACLService from "../services/create-bacl.service";
import CreatePFECLService from "../services/create-pfecl.service";

@injectable()
export default class FormController {
    constructor(
        private createEEPDService: CreateEEPDService,
        private createBACLService: CreateBACLService,
        private createPFECLService: CreatePFECLService
    ){}

    async createEEBD(req: Request, res: Response){
        await this.createEEPDService.execute(req, res);
    }

    async createBACL(req: Request, res: Response){
        await this.createBACLService.execute(req, res);
    }

    async createPFECL(req: Request, res: Response){
        await this.createPFECLService.execute(req, res);
    }
}