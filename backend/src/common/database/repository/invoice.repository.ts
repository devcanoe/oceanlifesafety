import { injectable } from "tsyringe";
import IRepository from "../../interfaces/repository.interface";
import DatabaseHelper from "../../helper/database.helper";
import Form from "../models/form.model";
import invoiceSchema from "../schemas/invoice.schema";
import Invoice from "../models/invoice.model";
import { createData, deleteData, readData, readSingleData, updateData } from "../../utils/database";

@injectable() 
export default class InvoiceRepository implements IRepository {
    constructor(
        private dataBaseHelper: DatabaseHelper
    ){
    }
    async addData(data: Invoice): Promise<Invoice> {
        return await createData(invoiceSchema, data);
    }
    async fetchData(data: any): Promise<Invoice[]> {
        return await readData(invoiceSchema, data);
    }
    async fetchOneData(data: any): Promise<Invoice> {
        return await readSingleData(invoiceSchema, data);
    }
    async updateData(keyword: any, data: any): Promise<Invoice> {
        return await updateData(invoiceSchema, keyword, data);
    }
    async deleteData(id: string) {
        await deleteData(invoiceSchema, {_id: id});
    }

}