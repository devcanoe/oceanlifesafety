import { injectable } from "tsyringe";
import { Request, Response } from "express";
import LoginService from "../services/login.service";
import RegisterService from "../services/register.service";

@injectable()
export default class AuthController {
    constructor(
        private loginService: LoginService,
        private registerService: RegisterService
    ){}

     //login investor
     async login(req: Request, res: Response){
        await this.loginService.execute(req, res);
    }

    async register(req: Request, res: Response){
        await this.registerService.execute(req, res);
    }
}