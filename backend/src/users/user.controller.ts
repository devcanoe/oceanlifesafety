import { injectable } from "tsyringe";
import GetUserService from "./services/get-user.service";
import { Request, Response, NextFunction } from "express";
import Http from "../common/helper/http.helper";
import UpdateUserService from "./services/update-user.service";


@injectable()
export default class UserController {
    constructor(
        private getUserService: GetUserService,
        private updateUserService: UpdateUserService,
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

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {

            const { user, phone, position } = req.body
   
            const response = await this.updateUserService.execute(user.id, {
                phone,
                position
            });
      
            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully update user data",
                data: response
            })
        }catch(err){
            next(err)
        }
    }
}