import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
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

    async createRaft(req: Request, res: Response, next: NextFunction){
        await this.createRaftService.execute(req, res, next);
    }

    async deleteRaft(req: Request, res: Response, next: NextFunction) {
        await this.deleteRaftService.execute(req, res, next);
    }

    async getRafts(req: Request, res: Response, next: NextFunction) {
        await this.getRaftsService.execute(req, res, next);
    }

    async getRaft(req: Request, res: Response, next: NextFunction) {
        await this.getRaftService.execute(req, res, next);
    }

    async updateRaft(req: Request, res: Response, next: NextFunction) {
        await this.updateRaftService.execute(req, res, next);
    }
}