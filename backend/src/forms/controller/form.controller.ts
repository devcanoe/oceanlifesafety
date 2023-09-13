import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import CreateEEPDService from "../services/create_eepd.service";
import CreateBACLService from "../services/create-bacl.service";
import CreatePFECLService from "../services/create-pfecl.service";
import GetFormsService from "../services/getforms.service";
import DeleteFormService from "../services/delete-form.service";
import GetFormService from "../services/get_form.service";
import UpdateFormService from "../services/update-form.service";

@injectable()
export default class FormController {
    constructor(
        private createEEPDService: CreateEEPDService,
        private createBACLService: CreateBACLService,
        private createPFECLService: CreatePFECLService,
        private getFormsService: GetFormsService,
        private getFormService: GetFormService,
        private deleteFormService: DeleteFormService,
        private updateFormService: UpdateFormService
    ){}

    async createEEBD(req: Request, res: Response, next: NextFunction){
        await this.createEEPDService.execute(req, res, next);
    }

    async createBACL(req: Request, res: Response, next: NextFunction){
        await this.createBACLService.execute(req, res, next);
    }

    async createPFECL(req: Request, res: Response, next: NextFunction){
        await this.createPFECLService.execute(req, res, next);
    }

    async getForms(req: Request, res: Response, next: NextFunction){
        await this.getFormsService.execute(req, res, next);
    }

    async getForm(req: Request, res: Response, next: NextFunction){
        await this.getFormService.execute(req, res, next);
    }

    async deleteForm(req: Request, res: Response, next: NextFunction){
        await this.deleteFormService.execute(req, res, next);
    }

    async updateForm(req: Request, res: Response, next: NextFunction){
        await this.updateFormService.execute(req, res, next);
    }
}