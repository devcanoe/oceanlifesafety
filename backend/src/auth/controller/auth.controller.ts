import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
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
     async login(req: Request, res: Response, next: NextFunction){
        await this.loginService.execute(req, res, next);
    }

    async register(req: Request, res: Response, next: NextFunction){
        await this.registerService.execute(req, res, next);
    }

    async dashboard(req: Request, res: Response, next: NextFunction){
        await this.dashboardService.execute(req, res, next);
    }
}