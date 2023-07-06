import { injectable } from "tsyringe";
import IRepository from "../../interfaces/repository.interface";
import DatabaseHelper from "../../helper/database.helper";
import { User } from "../models/user.model";
import shipSchema from "../schemas/ship.schema";

@injectable() 
export default class ShipRepository implements IRepository {
    constructor(
        private dataBaseHelper: DatabaseHelper
    ){
    }
    async addData(data: any): Promise<User> {
        return await this.dataBaseHelper.createData(shipSchema, data);
    }
    async fetchData(data: any): Promise<User[]> {
        return await this.dataBaseHelper.readData(shipSchema, data);
    }
    async fetchOneData(data: any): Promise<User> {
        return await this.dataBaseHelper.readSingleData(shipSchema, data);
    }
    async updateData(keyword: any, data: any): Promise<User> {
        return await this.dataBaseHelper.updateData(shipSchema, keyword, data);
    }
    async deleteData(id: string): Promise<void> {
        await this.dataBaseHelper.deleteData(shipSchema, {_id: id});
    }

}