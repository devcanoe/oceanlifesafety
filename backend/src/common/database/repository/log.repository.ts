import { injectable } from "tsyringe";
import IRepository from "../../interfaces/repository.interface";
import DatabaseHelper from "../../helper/database.helper";
import logSchema from "../schemas/logs.schema";
import Logs from "../models/logs.model";

@injectable() 
export default class LogRepository implements IRepository {
    constructor(
        private dataBaseHelper: DatabaseHelper
    ){
    }
    async addData(data: Logs): Promise<Logs> {
        return await this.dataBaseHelper.createData(logSchema, data);
    }
    async fetchData(data: Logs): Promise<Logs[]> {
        return await this.dataBaseHelper.readData(logSchema, data);
    }
    async fetchOneData(data: any): Promise<Logs> {
        return await this.dataBaseHelper.readSingleData(logSchema, data);
    }
    async updateData(keyword: any, data: any): Promise<Logs> {
        return await this.dataBaseHelper.updateData(logSchema, keyword, data);
    }
    async deleteData(id: string) {
        await this.dataBaseHelper.deleteData(logSchema, {_id: id});
    }

}