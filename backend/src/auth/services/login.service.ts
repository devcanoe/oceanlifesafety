import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Encryption from "../../common/helper/encrypt.helper";
import Http from "../../common/helper/http.helper";
import Token from "../../common/helper/token.helper";
import { User } from "../../common/database/models/user.model";
import UserRepository from "../../common/database/repository/user.repository";
import LogRepository from "../../common/database/repository/log.repository";
import { BadRequestError } from "../../common/error/badrequest.error";

const SECRET_KEY = process.env.SECRET_KEY || "";

@injectable()
export default class LoginService implements IService<Request, Response, NextFunction> {
    constructor(
        private userRepository: UserRepository,
        private encryptionHelper: Encryption,
        private logRepository: LogRepository,
        private tokenHelper: Token,
        private httpHelper: Http
    ){

    }

    async execute(req: Request, res: Response, next: NextFunction){
        try{
            const {
                email,
                password
            } = req.body;

            //check if user exists
            const user: User = await this.userRepository.fetchOneData({email});
        
            if(!user){
                throw new BadRequestError("Invalid email/password")
            }
    
            // //compare encrypted password
            const checkpassword = await this.encryptionHelper.compareHash(password, user.password);
        
            if(!checkpassword){
                throw new BadRequestError("Invalid email/password")
            }
    
            //generate user token for authorization
            const userdetails = {
                firstname: user.firstname,
                email: user.email,
                id: user._id,
            }
    
            const generatedToken = await this.tokenHelper.generate(userdetails, SECRET_KEY);

            await this.logRepository.addData({
                description: `${user.email} successfully logged in`,
                user: user._id
            });

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully Authorized User",
                data: {
                    token: generatedToken,
                    user: {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        id: user._id,
                    }
                }
            })
 
        }catch(err: any){
            next(err)
        }
    }
}