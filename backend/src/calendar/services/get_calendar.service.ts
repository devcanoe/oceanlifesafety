import { NextFunction, Response, Request } from "express";
import IService from "../../common/interfaces/service.interface";
import { injectable } from "tsyringe";
import CalendarRepository from "../../common/database/repository/calendar.repository";
import Http from "../../common/helper/http.helper";
import Calendar from "../../common/database/models/calender.model";

@injectable()
export default class GetCalendarService implements IService<Request, Response, NextFunction> {
    constructor(
        private calendarRepository: CalendarRepository,
        private httpHelper: Http
    ) {

    }

    async execute(req: Request, res: Response, next: NextFunction){
        try{
            const { task, servicing } = req.query;
            const { date } = req.params;
            console.log(date)
            const inputDateString = date

            // Parse the input date string
            const inputDate = new Date(inputDateString);

            // Format the output date string as "YYYY-MM-DD"
            const outputDateString = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;
            console.log(outputDateString)
            let result: Calendar[] = [];

            if(task) {
                result = await this.calendarRepository.fetchData({due_date: outputDateString, type: "TASK"});
            } else if (servicing){
                result = await this.calendarRepository.fetchData({due_date: outputDateString, type: "SERVICING"});
            } else {
                result = await this.calendarRepository.fetchData({due_date: outputDateString});
            }
            
            console.log('result ' + result);

            this.httpHelper.Response({
                res,
                status: "success",
                message: "successfully fetch tasks",
                data: result
            })
        }catch(err: any){
            next(err)
        }
    }
}