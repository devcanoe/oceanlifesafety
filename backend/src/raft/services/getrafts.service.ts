import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import RaftRepository from "../../common/database/repository/raft.repository";

@injectable()
export default class GetRaftsService implements IService<Request, Response, NextFunction> {
    constructor(
        private httpHelper: Http,
        private raftRepository: RaftRepository
    ){

    }

    async execute(req: Request, res: Response, next: NextFunction){
        try{

            const { id } = req.params;
            
            const data = await this.raftRepository.fetchData({company: id});
            
            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully fetched rafts",
                data
            })

        }catch(err: any){
            next(err)
        }
    }
}