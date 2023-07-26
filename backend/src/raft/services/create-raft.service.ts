import { injectable } from "tsyringe";
import { Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import RaftRepository from "../../common/database/repository/raft.repository";
import LogRepository from "../../common/database/repository/log.repository";

@injectable()
export default class CreateRaftService implements IService<Request, Response> {
    constructor(
        private httpHelper: Http,
        private raftRepository: RaftRepository,
        private logRepository: LogRepository
    ){

    }

    async execute(req: Request, res: Response){
        try{
            console.log(req.body)

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
            this.httpHelper.Response({
                res,
                status: "error",
                message: err.message
            })
        }
    }
}