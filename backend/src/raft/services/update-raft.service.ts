import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from 'express';
import IService from "../../common/interfaces/service.interface";
import RaftRepository from "../../common/database/repository/raft.repository";
import Http from "../../common/helper/http.helper";
import LogRepository from "../../common/database/repository/log.repository";

@injectable()
export default class UpdateRaftService implements IService<Request, Response, NextFunction>{
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

            const data = await this.raftRepository.updateData({_id: id}, req.body);

            await this.logRepository.addData({
                description: `${user.email} updated raft with serial number ${data.serial_no}`,
                user: user.id
            })
      
            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully updated raft",
                data
            })

        }catch(err: any){
            next(err)
        }
    }
}