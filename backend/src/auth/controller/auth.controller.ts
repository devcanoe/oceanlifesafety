import { injectable } from "tsyringe";
import { Request, Response } from "express";
import LoginService from "../services/login.service";
import RegisterService from "../services/register.service";
import DashboardService from "../services/dashboard.service";

@injectable()
export default class AuthController {
    constructor(
        private loginService: LoginService,
        private registerService: RegisterService,
        private dashboardService: DashboardService
    ){}

     //login investor
     async login(req: Request, res: Response){
        await this.loginService.execute(req, res);
    }

    async register(req: Request, res: Response){
        await this.registerService.execute(req, res);
    }

    async dashboard(req: Request, res: Response){
        await this.dashboardService.execute(req, res);
    }
}