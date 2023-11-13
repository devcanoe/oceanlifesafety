import { NextFunction, Response, Request } from "express";
import IService from "../../common/interfaces/service.interface";
import { injectable } from "tsyringe";
import CalendarRepository from "../../common/database/repository/calendar.repository";
import Http from "../../common/helper/http.helper";

@injectable()
export default class UpdateTaskService implements IService<Request, Response, NextFunction> {
    constructor(
        private calendarRepository: CalendarRepository,
        private httpHelper: Http
    ) {

    }

    async execute(req: Request, res: Response, next: NextFunction){
        try{
            const { id } = req.params;

            const updateTask = await this.calendarRepository.updateData({_id: id}, {
                status: true
            });

            this.httpHelper.Response({
                res,
                status: "success",
                message: "successfully update task",
                data: updateTask
            })
        }catch(err: any){
            next(err)
        }
    }
}