import { injectable } from "tsyringe";
import GetUserService from "./services/get-user.service";
import { Request, Response, NextFunction } from "express";
import Http from "../common/helper/http.helper";


@injectable()
export default class UserController {
    constructor(
        private getUserService: GetUserService,
        private httpHelper: Http
    ){

    }

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {

            const { user } = req.body
            
            const response = await this.getUserService.execute(user.id)

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully get user data",
                data: response
            })
        }catch(err){
            next(err)
        }
    }
}