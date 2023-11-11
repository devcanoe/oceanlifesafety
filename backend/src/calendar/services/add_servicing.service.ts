import { NextFunction, Response, Request } from "express";
import IService from "../../common/interfaces/service.interface";
import { injectable } from "tsyringe";
import CalendarRepository from "../../common/database/repository/calendar.repository";
import Http from "../../common/helper/http.helper";

@injectable()
export default class AddServicingService implements IService<Request, Response, NextFunction> {
    constructor(
        private calendarRepository: CalendarRepository,
        private httpHelper: Http
    ) {

    }

    async execute(req: Request, res: Response, next: NextFunction){
        try{
            const { vessel, company, due_date } = req.body;

            const addTask = await this.calendarRepository.addData({
                type: "SERVICING",
                due_date: due_date,
                vessel,
                company
            });

            this.httpHelper.Response({
                res,
                status: "success",
                message: "successfully added new servicng",
                data: addTask
            })
        }catch(err: any){
            next(err)
        }
    }
}