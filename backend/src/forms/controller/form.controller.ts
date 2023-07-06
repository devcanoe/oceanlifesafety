import { injectable } from "tsyringe";
import { Request, Response } from "express";
import CreateEEPDService from "../services/create_eepd.service";

@injectable()
export default class FormController {
    constructor(
        private createEEPDService: CreateEEPDService,
    ){}

    async createEEBD(req: Request, res: Response){
        await this.createEEPDService.execute(req, res);
    }
}