import { NextFunction } from "express";
import { Response, Request } from "express";
import Token from "../helper/token.helper";
import { container } from "tsyringe";
import UserRepository from "../database/repository/user.repository";

const SECRET_KEY = process.env.SECRET_KEY || "";

const tokenHelper = container.resolve(Token);
const userRepository = container.resolve(UserRepository);

export default async function userAuth(req: Request, res: Response, next: NextFunction) {
    try {
    const authHeader: string | undefined = req.headers.authorization ;
 
    if(!authHeader || !authHeader.split(' ')[1]){
        res.json({
        status: "error",
        message: 'Not authorized to take this action'
        })
    }

    const accesstoken = authHeader && authHeader.split(' ')[1];
    const verifyToken = await tokenHelper.verify(accesstoken, `${SECRET_KEY}`);

    if(!verifyToken){
        res.json({
        status: "error",
        message: 'Not authorized to take this action'
        })
    } else {
        req.body.user = verifyToken
    }       

    next()
    }catch(err: any){
        res.json({
            status: "error",
            message: err.message
        })

        next()
    }
}