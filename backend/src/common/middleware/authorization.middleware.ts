import { NextFunction } from "express";
import { Response, Request } from "express";
import Token from "../helper/token.helper";
import { container } from "tsyringe";
import { BadRequestError } from "../error/badrequest.error";


export default async function userAuth(req: Request, res: Response, next: NextFunction) {
    try {
    const authHeader: string | undefined = req.headers.authorization ;
  
    console.log('req ' + JSON.stringify(req.body))
    if(!authHeader || !authHeader.split(' ')[1]){
        throw new BadRequestError('Not authorized to take this action')
    }

    const accesstoken = authHeader && authHeader.split(' ')[1];
    
    const tokenHelper = container.resolve(Token);
    const verifyToken = await tokenHelper.verify(accesstoken);
    // console.log(verifyToken)

    if(!verifyToken){
       throw new BadRequestError('Not authorized to take this action')
    } else {
        req.body.user = verifyToken
    }       

    next()
    }catch(err: any){
        res.json({
            status: "error",
            message: err.message
        })
    }
}