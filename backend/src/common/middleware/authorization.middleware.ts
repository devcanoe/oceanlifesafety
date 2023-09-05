import { NextFunction } from "express";
import { Response, Request } from "express";
import Token from "../helper/token.helper";
import { container } from "tsyringe";


export default async function userAuth(req: Request, res: Response, next: NextFunction) {
    try {
    const authHeader: string | undefined = req.headers.authorization ;
    console.log(authHeader)
    if(!authHeader || !authHeader.split(' ')[1]){
        res.json({
        status: "error",
        message: 'Not authorized to take this action'
        })
    }

    const accesstoken = authHeader && authHeader.split(' ')[1];
    console.log(accesstoken)
    const tokenHelper = container.resolve(Token);
    const verifyToken = await tokenHelper.verify(accesstoken);
    // console.log(verifyToken)

    // if(!verifyToken){
    //     res.json({
    //     status: "error",
    //     message: 'Not authorized to take this action'
    //     })
    // } else {
    //     req.body.user = verifyToken
    // }       

    next()
    }catch(err: any){
        res.json({
            status: "error",
            message: err.message
        })
    }
}