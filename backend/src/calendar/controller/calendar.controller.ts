import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import AddServicingService from "../services/add_servicing.service";
import DeleteServicingService from "../services/delete_servicing.service";
import UpdateServicingService from "../services/update_servicing.service";
import AddTaskService from "../services/add_task.service";
import DeleteTaskService from "../services/delete_task.service";
import UpdateTaskService from "../services/update_task.service";
import GetTaskService from "../services/get_task.service";
import GetCalendarService from "../services/get_calendar.service";
import GetHighlightService from "../services/get_highlights.service";
import Http from "../../common/helper/http.helper";

@injectable()
export default class CalendarController {
    constructor(
        private addServicingService: AddServicingService,
        private deleteServicingService: DeleteServicingService,
        private updateServicingService: UpdateServicingService,
        private addTaskService: AddTaskService,
        private deleteTaskService: DeleteTaskService,
        private updateTaskService: UpdateTaskService,
        private getTaskService: GetTaskService,
        private getCalendarService: GetCalendarService,
        private getHighlightService: GetHighlightService,
        private httpHelper: Http
    ){

    }

    async getHighLight(req: Request, res: Response, next: NextFunction){
        try{

            const { date } = req.params;

            const response = await this.getHighlightService.execute(new Date(date));

            this.httpHelper.Response({
                res,
                status: "success",
                message: "successfully get date for particular month",
                data: response
            })
        }catch(err){
            next(err)
        }
    }

    async addServicing(req: Request, res: Response, next: NextFunction){
        await this.addServicingService.execute(req, res, next);
    }

    async deleteServicing(req: Request, res: Response, next: NextFunction){
        await this.deleteServicingService.execute(req, res, next);
    }

    async updateServicing(req: Request, res: Response, next: NextFunction){
        await this.updateServicingService.execute(req, res, next);
    }

    async addTask(req: Request, res: Response, next: NextFunction){
        await this.addTaskService.execute(req, res, next);
    }

    async deleteTask(req: Request, res: Response, next: NextFunction){
        await this.deleteTaskService.execute(req, res, next);
    }

    async updateTask(req: Request, res: Response, next: NextFunction){
        await this.updateTaskService.execute(req, res, next);
    }

    async getTask(req: Request, res: Response, next: NextFunction){
        await this.getTaskService.execute(req, res, next);
    }

    async getCalendar(req: Request, res: Response, next: NextFunction){
        await this.getCalendarService.execute(req, res, next);
    }
}