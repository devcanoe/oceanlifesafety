import { injectable } from "tsyringe";
import IRepository from "../../interfaces/repository.interface";
import DatabaseHelper from "../../helper/database.helper";
import Company from "../models/company.model";
import formSchema from "../schemas/form.schema";
import Form from "../models/form.model";

@injectable() 
export default class FormRepository implements IRepository {
    constructor(
        private dataBaseHelper: DatabaseHelper
    ){
    }
    async addData(data: any): Promise<Form> {
        return await this.dataBaseHelper.createData(formSchema, data);
    }
    async fetchData(data: any): Promise<Form[]> {
        return await this.dataBaseHelper.readData(formSchema, data);
    }
    async fetchOneData(data: any): Promise<Form> {
        return await this.dataBaseHelper.readSingleData(formSchema, data);
    }
    async updateData(keyword: any, data: any): Promise<Form> {
        return await this.dataBaseHelper.updateData(formSchema, keyword, data);
    }
    async deleteData(id: string) {
        await this.dataBaseHelper.deleteData(formSchema, {_id: id});
    }

}