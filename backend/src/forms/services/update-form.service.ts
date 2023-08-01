import { injectable } from "tsyringe";
import { Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import FormRepository from "../../common/database/repository/form.repository";

@injectable()
export default class UpdateFormService implements IService<Request, Response>{
    constructor(
        private httpHelper: Http,
        private formRepository: FormRepository
    ){

    }

    async execute(req: Request, res: Response){
        try{

            const { id } = req.params;

            const data = await this.formRepository.updateData({_id: id}, req.body);
            
            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully update form",
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