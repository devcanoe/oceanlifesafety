import { injectable } from "tsyringe";
import IRepository from "../../interfaces/repository.interface";
import DatabaseHelper from "../../helper/database.helper";
import Form from "../models/form.model";
import invoiceSchema from "../schemas/invoice.schema";

@injectable() 
export default class InvoiceRepository implements IRepository {
    constructor(
        private dataBaseHelper: DatabaseHelper
    ){
    }
    async addData(data: any): Promise<Form> {
        return await this.dataBaseHelper.createData(invoiceSchema, data);
    }
    async fetchData(data: any): Promise<Form[]> {
        return await this.dataBaseHelper.readData(invoiceSchema, data);
    }
    async fetchOneData(data: any): Promise<Form> {
        return await this.dataBaseHelper.readSingleData(invoiceSchema, data);
    }
    async updateData(keyword: any, data: any): Promise<Form> {
        return await this.dataBaseHelper.updateData(invoiceSchema, keyword, data);
    }
    async deleteData(id: string) {
        await this.dataBaseHelper.deleteData(invoiceSchema, {_id: id});
    }

}