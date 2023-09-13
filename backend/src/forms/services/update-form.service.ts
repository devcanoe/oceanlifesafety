import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import FormRepository from "../../common/database/repository/form.repository";
import LogRepository from "../../common/database/repository/log.repository";

@injectable()
export default class UpdateFormService implements IService<Request, Response, NextFunction>{
    constructor(
        private httpHelper: Http,
        private formRepository: FormRepository,
        private logRepository: LogRepository
    ){

    }

    async execute(req: Request, res: Response, next: NextFunction){
        try{

            const { id } = req.params;

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
       
            const data = await this.formRepository.updateData({_id: id}, {
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
                description: `${user.email} updated eepd form`,
                user: user.id
            });
            
            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully update form",
                data
            });
 
        }catch(err: any){
            next(err)
        }
    }
}