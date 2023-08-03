import { injectable } from "tsyringe";
import { Request, Response} from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import FormRepository from "../../common/database/repository/form.repository";
import FormColumn from "../../common/database/models/form_columns.model";
import LogRepository from "../../common/database/repository/log.repository";

@injectable()
export default class CreateEEPDService implements IService<Request, Response>{
    constructor(
        private httpHelper: Http,
        private formRepository: FormRepository,
        private logRepository: LogRepository
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
                specifications,
                user
            } = req.body;
            console.log(specifications)
            const createForm = await this.formRepository.addData({
                company,
                ship,
                location_of_vessel,
                service_date,
                flag_state,
                last_service_date,
                type: "EEBD",
                specifications
            });

            await this.logRepository.addData({
                description: `${user.email} created eepd form`,
                user: user.id
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