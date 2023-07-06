import { injectable } from "tsyringe";
import { Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Encryption from "../../common/helper/encrypt.helper";
import Http from "../../common/helper/http.helper";
import Token from "../../common/helper/token.helper";
import { User } from "../../common/database/models/user.model";
import UserRepository from "../../common/database/repository/user.repository";

const SECRET_KEY = process.env.SECRET_KEY || "";

@injectable()
export default class LoginService implements IService<Request, Response> {
    constructor(
        private userRepository: UserRepository,
        private encryptionHelper: Encryption,
        private tokenHelper: Token,
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
            const user: User = await this.userRepository.fetchOneData({email});
        
            if(!user){
                throw(new Error("Invalid email/password"))
            }
    
            // //compare encrypted password
            const checkpassword = await this.encryptionHelper.compareHash(password, user.password);
        
            if(!checkpassword){
                throw(new Error("Invalid email/password"))
            }
    
            //generate user token for authorization
            const userdetails = {
                firstname: user.firstname,
                id: user._id,
            }
    
            const generatedToken = await this.tokenHelper.generate(userdetails, SECRET_KEY);

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully Authorized User",
                data: {
                    token: generatedToken,
                    user: {
                        firstname: user.firstname,
                        id: user._id,
                    }
                }
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