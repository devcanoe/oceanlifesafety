import { Router } from "express";
import { container } from 'tsyringe';
import userAuth from "../../common/middleware/authorization.middleware";
import CalendarController from "../controller/calendar.controller";

const calendarRouter = Router();
const companyController = container.resolve(CalendarController);

calendarRouter.post('/create-servicing', userAuth, (req, res, next)=>companyController.addServicing(req, res, next));
calendarRouter.post('/create-task', userAuth, (req, res, next)=>companyController.addTask(req, res, next));
calendarRouter.get('/tasks/:id', userAuth, (req, res, next)=>companyController.getTask(req, res, next));
calendarRouter.get('/', userAuth, (req, res, next)=>companyController.getCalendar(req, res, next));
calendarRouter.get('/monthhighlight/:date', userAuth, (req, res, next)=>companyController.getHighLight(req, res, next));
calendarRouter.delete('/task/:id', userAuth, (req, res, next)=>companyController.deleteTask(req, res, next));
calendarRouter.delete('/servicing/:id', userAuth, (req, res, next)=>companyController.deleteServicing(req, res, next));
calendarRouter.patch('/task/:id', userAuth, (req, res, next)=>companyController.updateTask(req, res, next));
calendarRouter.patch('/servicing/:id', userAuth, (req, res, next)=>companyController.updateServicing(req, res, next));

export default calendarRouter