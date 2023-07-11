import { injectable } from "tsyringe";
import { Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import RaftRepository from "../../common/database/repository/raft.repository";

@injectable()
export default class GetRaftsService implements IService<Request, Response> {
    constructor(
        private httpHelper: Http,
        private raftRepository: RaftRepository
    ){

    }

    async execute(req: Request, res: Response){
        try{

            const { id } = req.params;
            console.log(id)
            const data = await this.raftRepository.fetchData({company: id});
            console.log(data)
            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully fetched rafts",
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