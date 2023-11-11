import { NextFunction, Response, Request } from "express";
import IService from "../../common/interfaces/service.interface";
import { injectable } from "tsyringe";
import CalendarRepository from "../../common/database/repository/calendar.repository";
import Http from "../../common/helper/http.helper";

@injectable()
export default class AddTaskService implements IService<Request, Response, NextFunction> {
    constructor(
        private calendarRepository: CalendarRepository,
        private httpHelper: Http
    ) {

    }

    async execute(req: Request, res: Response, next: NextFunction){
        try{
            const { description, title, due_date, due_time } = req.body;

            const addTask = await this.calendarRepository.addData({
                type: "TASK",
                description,
                title,
                due_date: due_date,
                due_time: due_time
            });

            this.httpHelper.Response({
                res,
                status: "success",
                message: "successfully added new task",
                data: addTask
            })
        }catch(err: any){
            next(err)
        }
    }
}