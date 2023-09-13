import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import RaftRepository from "../../common/database/repository/raft.repository";
import LogRepository from "../../common/database/repository/log.repository";

@injectable()
export default class CreateRaftService implements IService<Request, Response, NextFunction> {
    constructor(
        private httpHelper: Http,
        private raftRepository: RaftRepository,
        private logRepository: LogRepository
    ){

    }

    async execute(req: Request, res: Response, next: NextFunction){
        try{
            const data = await this.raftRepository.addData(req.body);

            await this.logRepository.addData({
                description: `${req.body.user.email} added ${data.serial_no} raft`,
                user: req.body.user.id
            });

            
            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully created new raft",
                data
            })

        }catch(err: any){
            next(err)
        }
    }
}