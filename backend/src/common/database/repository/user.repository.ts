import { injectable } from "tsyringe";
import IRepository from "../../interfaces/repository.interface";
import DatabaseHelper from "../../helper/database.helper";
import userSchema from "../schemas/user.schema";
import { User } from "../models/user.model";

@injectable() 
export default class UserRepository implements IRepository {
    constructor(
        private dataBaseHelper: DatabaseHelper
    ){
    }
    async addData(data: any): Promise<User> {
        return await this.dataBaseHelper.createData(userSchema, data);
    }
    async fetchData(data: any): Promise<User[]> {
        return await this.dataBaseHelper.readData(userSchema, data);
    }
    async fetchOneData(data: any): Promise<User> {
        return await this.dataBaseHelper.readSingleData(userSchema, data);
    }
    async updateData(keyword: any, data: any): Promise<User> {
        return await this.dataBaseHelper.updateData(userSchema, keyword, data);
    }
    async deleteData(id: string) {
        await this.dataBaseHelper.deleteData(userSchema, {_id: id});
    }

}