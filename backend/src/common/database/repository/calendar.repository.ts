import { injectable } from "tsyringe";
import IRepository from "../../interfaces/repository.interface";
import DatabaseHelper from "../../helper/database.helper";
import calendarSchema from "../schemas/calendar.schema";
import Calendar from "../models/calender.model";

@injectable() 
export default class CalendarRepository implements IRepository {
    constructor(
        private dataBaseHelper: DatabaseHelper
    ){
    }
    async addData(data: any): Promise<Calendar> {
        return await this.dataBaseHelper.createData(calendarSchema, data);
    }
    async fetchData(data: any): Promise<Calendar[]> {
        return await this.dataBaseHelper.readData(calendarSchema, data);
    }
    async fetchOneData(data: any): Promise<Calendar> {
        return await this.dataBaseHelper.readSingleData(calendarSchema, data);
    }
    async updateData(keyword: any, data: any): Promise<Calendar> {
        return await this.dataBaseHelper.updateData(calendarSchema, keyword, data);
    }
    async deleteData(id: string) {
        await this.dataBaseHelper.deleteData(calendarSchema, {_id: id});
    }

}