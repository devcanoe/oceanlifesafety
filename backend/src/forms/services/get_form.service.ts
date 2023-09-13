import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import FormRepository from "../../common/database/repository/form.repository";

@injectable()
export default class GetFormService implements IService<Request, Response, NextFunction>{
    constructor(
        private httpHelper: Http,
        private formRepository: FormRepository
    ){

    }

    async execute(req: Request, res: Response, next: NextFunction){
        try{

            const { id } = req.params;
           
            const data = await this.formRepository.fetchOneData({_id: id});
            
            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully fetch form",
                data
            });
 
        }catch(err: any){
            next(err)
        }
    }
}