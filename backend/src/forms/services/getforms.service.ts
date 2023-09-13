import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import FormRepository from "../../common/database/repository/form.repository";
import Http from "../../common/helper/http.helper";
import IService from "../../common/interfaces/service.interface";


@injectable()
export default class GetFormsService implements IService<Request, Response, NextFunction> {
    constructor(
        private httpHelper: Http,
        private formRepository: FormRepository
    ){}

    async execute(req: Request, res: Response, next: NextFunction) {
        try{

            const { company } = req.params;
           
            const data = await this.formRepository.fetchData({company});
            
            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully get forms",
                data
            });
 
        }catch(err: any){
            next(err)
        }
    }
}