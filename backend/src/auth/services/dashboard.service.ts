import { injectable } from "tsyringe";
import { Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import CompanyRepository from "../../common/database/repository/company.repository";
import ShipRepository from "../../common/database/repository/ship.repository";
import RaftRepository from "../../common/database/repository/raft.repository";
import FormRepository from "../../common/database/repository/form.repository";

@injectable()
export default class DashboardService implements IService<Request, Response> {
    constructor(
        private httpHelper: Http,
        private companyRepository: CompanyRepository,
        private shipRepository: ShipRepository,
        private raftRepository: RaftRepository,
        private formRepository: FormRepository
    ){}

    async execute(req: Request, res: Response) {
        try {

            const company = await this.companyRepository.fetchData({});

            const ship = await this.shipRepository.fetchData({});

            const raft = await this.raftRepository.fetchData({});

            const form = await this.formRepository.fetchData({});
            
            this.httpHelper.Response({
                res,
                status: "error",
                message: "successfully fetch dashboard data",
                data: {
                    company: company.length,
                    ship: ship.length,
                    raft: raft.length,
                    form: form.length
                }
            });
        }catch(err: any){
            this.httpHelper.Response({
                res,
                status: "error",
                message: err.message
            });
        }
    }
}