import { injectable } from "tsyringe";
import GetUserService from "./services/get-user.service";
import { Request, Response, NextFunction } from "express";
import Http from "../common/helper/http.helper";
import UpdateUserService from "./services/update-user.service";
import ChangepasswordService from "./services/changepassword.service";
import AddUserService from "./services/add-user.service";
import GetUsersService from "./services/get-users.service";
import DeleteUserService from "./services/delete-user.service";


@injectable()
export default class UserController {
    constructor(
        private getUserService: GetUserService,
        private getUsersService: GetUsersService,
        private updateUserService: UpdateUserService,
        private changePasswordService: ChangepasswordService,
        private addUserService: AddUserService,
        private deleteUserService: DeleteUserService,
        private httpHelper: Http
    ){

    }

    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {

            const { user, password, confirmpassword } = req.body
   
            await this.changePasswordService.execute(user.id, password, confirmpassword);
      
            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully change password"
            })
        }catch(err){
            next(err)
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params
   
            await this.deleteUserService.execute(id);

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully deleted user"
            })
        }catch(err){
            next(err)
        }
    }

    async addUser(req: Request, res: Response, next: NextFunction) {
        try {
            await this.addUserService.execute(req.body);
      
            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully create employee account"
            })
        }catch(err){
            next(err)
        }
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

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
   
            const response = await this.getUsersService.execute()
      
            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully get users data",
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