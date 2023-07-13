import { injectable } from "tsyringe";
import { Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import RaftRepository from "../../common/database/repository/raft.repository";
import LogRepository from "../../common/database/repository/log.repository";

@injectable()
export default class DeleteRaftService implements IService<Request, Response> {
    constructor(
        private httpHelper: Http,
        private raftRepository: RaftRepository,
        private logRepository: LogRepository
    ){

    }

    async execute(req: Request, res: Response){
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
            this.httpHelper.Response({
                res,
                status: "error",
                message: err.message
            })
        }
    }
}