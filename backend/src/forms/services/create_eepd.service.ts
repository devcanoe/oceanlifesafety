import { injectable } from "tsyringe";
import { Request, Response} from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import FormRepository from "../../common/database/repository/form.repository";
import FormColumn from "../../common/database/models/form_columns.model";

@injectable()
export default class CreateEEPDService implements IService<Request, Response>{
    constructor(
        private httpHelper: Http,
        private formRepository: FormRepository
    ){}
    async execute(req: Request, res: Response): Promise<void> {
        try{
            const {
                company,
                ship,
                location_of_vessel,
                service_date,
                flag_state,
                last_service_date,
                type,
                specifications
            } = req.body;

            const createForm = await this.formRepository.addData({
                company,
                ship,
                location_of_vessel,
                service_date,
                flag_state,
                last_service_date,
                type
            });

            specifications.map((specification: FormColumn)=>{
                createForm.specifications?.push(specification)
            });
            
            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully create eebd",
                data: createForm
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