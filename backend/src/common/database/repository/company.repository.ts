import { injectable } from "tsyringe";
import IRepository from "../../interfaces/repository.interface";
import DatabaseHelper from "../../helper/database.helper";
import userSchema from "../schemas/user.schema";
import { User } from "../models/user.model";
import companySchema from "../schemas/company.schema";
import Company from "../models/company.model";

@injectable() 
export default class CompanyRepository implements IRepository {
    constructor(
        private dataBaseHelper: DatabaseHelper
    ){
    }
    async addData(data: any): Promise<Company> {
        return await this.dataBaseHelper.createData(companySchema, data);
    }
    async fetchData(data: any): Promise<Company[]> {
        return await this.dataBaseHelper.readData(companySchema, data);
    }
    async fetchOneData(data: any): Promise<Company> {
        return await this.dataBaseHelper.readSingleData(companySchema, data);
    }
    async updateData(keyword: any, data: any): Promise<Company> {
        return await this.dataBaseHelper.updateData(companySchema, keyword, data);
    }
    async deleteData(id: string) {
        await this.dataBaseHelper.deleteData(companySchema, {_id: id});
    }

}