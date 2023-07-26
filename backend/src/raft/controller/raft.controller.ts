import { injectable } from "tsyringe";
import { Request, Response } from "express";
import DeleteRaftService from "../services/delete-raft.service";
import GetRaftsService from "../services/getrafts.service";
import CreateRaftService from "../services/create-raft.service";
import GetRaftService from "../services/getraft.service";
import UpdateRaftService from "../services/update-raft.service";

@injectable()
export default class RaftController {
    constructor(
        private createRaftService: CreateRaftService,
        private deleteRaftService: DeleteRaftService,
        private getRaftsService: GetRaftsService,
        private getRaftService: GetRaftService,
        private updateRaftService: UpdateRaftService
    ){

    }

    async createRaft(req: Request, res: Response){
        await this.createRaftService.execute(req, res);
    }

    async deleteRaft(req: Request, res: Response) {
        await this.deleteRaftService.execute(req, res);
    }

    async getRafts(req: Request, res: Response) {
        await this.getRaftsService.execute(req, res);
    }

    async getRaft(req: Request, res: Response) {
        await this.getRaftService.execute(req, res);
    }

    async updateRaft(req: Request, res: Response) {
        await this.updateRaftService.execute(req, res);
    }
}