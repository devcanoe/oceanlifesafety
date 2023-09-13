import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from 'express';
import IService from "../../common/interfaces/service.interface";
import RaftRepository from "../../common/database/repository/raft.repository";
import Http from "../../common/helper/http.helper";

@injectable()
export default class GetRaftService implements IService<Request, Response, NextFunction>{
    constructor(
        private httpHelper: Http,
        private raftRepository: RaftRepository,
    ){

    }

    async execute(req: Request, res: Response, next: NextFunction){
        try{

            const { id } = req.params;

            const data = await this.raftRepository.fetchOneData({_id: id});
      
            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully fetched raft",
                data
            })

        }catch(err: any){
            next(err)
        }
    }
}