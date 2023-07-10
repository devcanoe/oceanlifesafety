import { injectable } from "tsyringe";
import { Request, Response } from "express";
import DeleteRaftService from "../services/delete-raft.service";
import GetRaftsService from "../services/getrafts.service";
import CreateRaftService from "../services/create-raft.service";

@injectable()
export default class RaftController {
    constructor(
        private createRaftService: CreateRaftService,
        private deleteRaftService: DeleteRaftService,
        private getRaftService: GetRaftsService
    ){

    }

    async createRaft(req: Request, res: Response){
        await this.createRaftService.execute(req, res);
    }

    async deleteRaft(req: Request, res: Response) {
        await this.deleteRaftService.execute(req, res);
    }

    async getRafts(req: Request, res: Response) {
        await this.getRaftService.execute(req, res);
    }
}