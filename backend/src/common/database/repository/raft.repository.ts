import { injectable } from "tsyringe";
import IRepository from "../../interfaces/repository.interface";
import DatabaseHelper from "../../helper/database.helper";
import Form from "../models/form.model";
import raftSchema from "../schemas/raft.schema";
import Raft from "../models/raft.model";

@injectable() 
export default class RaftRepository implements IRepository {
    constructor(
        private dataBaseHelper: DatabaseHelper
    ){
    }
    async addData(data: any): Promise<Raft> {
        return await this.dataBaseHelper.createData(raftSchema, data);
    }
    async fetchData(data: any): Promise<Raft[]> {
        return await this.dataBaseHelper.readData(raftSchema, data).populate("ship");
    }
    async fetchOneData(data: any): Promise<Raft> {
        return await this.dataBaseHelper.readSingleData(raftSchema, data);
    }
    async updateData(keyword: any, data: any): Promise<Raft> {
        return await this.dataBaseHelper.updateData(raftSchema, keyword, data);
    }
    async deleteData(id: string) {
        await this.dataBaseHelper.deleteData(raftSchema, {_id: id});
    }

}