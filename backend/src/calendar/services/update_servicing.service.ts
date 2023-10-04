import { NextFunction, Response, Request } from "express";
import IService from "../../common/interfaces/service.interface";
import { injectable } from "tsyringe";
import CalendarRepository from "../../common/database/repository/calendar.repository";
import Http from "../../common/helper/http.helper";

@injectable()
export default class UpdateServicingService implements IService<Request, Response, NextFunction> {
    constructor(
        private calendarRepository: CalendarRepository,
        private httpHelper: Http
    ) {

    }

    async execute(req: Request, res: Response, next: NextFunction){
        try{
            const { id } = req.params;

            const updateServicing = await this.calendarRepository.updateData({_id: id}, req.body);

            this.httpHelper.Response({
                res,
                status: "success",
                message: "successfully update servicng",
                data: updateServicing
            })
        }catch(err: any){
            next(err)
        }
    }
}