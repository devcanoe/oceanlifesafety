import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import RaftRepository from "../../common/database/repository/raft.repository";
import LogRepository from "../../common/database/repository/log.repository";

@injectable()
export default class DeleteRaftService implements IService<Request, Response, NextFunction> {
    constructor(
        private httpHelper: Http,
        private raftRepository: RaftRepository,
        private logRepository: LogRepository
    ){

    }

    async execute(req: Request, res: Response, next: NextFunction){
        try{

            const { id } = req.params;

            const { user } = req.body;

            await this.raftRepository.deleteData(id);

            await this.logRepository.addData({
                description: `${user.email} deleted ${id} raft`,
                user: user._id
            });

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully deleted raft",
            })

        }catch(err: any){
            next(err)
        }
    }
}