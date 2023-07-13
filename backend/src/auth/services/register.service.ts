import { injectable } from "tsyringe";
import { Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Encryption from "../../common/helper/encrypt.helper";
import Http from "../../common/helper/http.helper";
import Token from "../../common/helper/token.helper";
import { User } from "../../common/database/models/user.model";
import UserRepository from "../../common/database/repository/user.repository";
import LogRepository from "../../common/database/repository/log.repository";

const SECRET_KEY = process.env.SECRET_KEY || "";

@injectable()
export default class RegisterService implements IService<Request, Response> {
    constructor(
        private userRepository: UserRepository,
        private logRepository: LogRepository,
        private encryptionHelper: Encryption,
        private httpHelper: Http
    ){

    }

    async execute(req: Request, res: Response){
        try{
            const {
                email,
                password
            } = req.body;

            //check if user exists
            const user: User = await this.userRepository.fetchOneData({email: email});

            if(user){
                throw(new Error("Email already taken"))
            }
    
            //encrypt password
            const hashedPassword = await this.encryptionHelper.hash(password)
        
            const data = await this.userRepository.addData({
                ...req.body,
                password: hashedPassword
            });

            await this.logRepository.addData({
                description: `${data.email} successfully registered an account`,
                user: data._id
            });

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully Create User",
                data
            })
 
        }catch(err: any){
            this.httpHelper.Response({
                res,
                status: "error",
                message: err.message
            })
        }
    }
}