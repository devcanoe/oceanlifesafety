import { injectable } from "tsyringe";
import { Request, Response } from "express";
import FormRepository from "../../common/database/repository/form.repository";
import Http from "../../common/helper/http.helper";
import IService from "../../common/interfaces/service.interface";


@injectable()
export default class GetFormsService implements IService<Request, Response> {
    constructor(
        private httpHelper: Http,
        private formRepository: FormRepository
    ){}

    async execute(req: Request, res: Response) {
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
            this.httpHelper.Response({
                res,
                status: "error",
                message: err.message
            })
        }
    }
}