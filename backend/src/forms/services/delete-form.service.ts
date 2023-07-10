import { injectable } from "tsyringe";
import { Request, Response } from "express";
import FormRepository from "../../common/database/repository/form.repository";
import Http from "../../common/helper/http.helper";
import IService from "../../common/interfaces/service.interface";


@injectable()
export default class DeleteFormService implements IService<Request, Response> {
    constructor(
        private httpHelper: Http,
        private formRepository: FormRepository
    ){}

    async execute(req: Request, res: Response) {
        try{

            const {id} = req.params;
           
            await this.formRepository.deleteData(id);
            
            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully delete form",
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