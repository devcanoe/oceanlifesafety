import { injectable } from "tsyringe";
import { Request, Response } from "express";
import InvoiceRepository from "../../common/database/repository/invoice.repository";
import Http from "../../common/helper/http.helper";
import IService from "../../common/interfaces/service.interface";

@injectable()
export default class FetchInvoicesService implements IService<Request, Response> {
    constructor(
        private httpHelper: Http,
        private invoiceRepository: InvoiceRepository
    ){}
    async execute(req: Request, res: Response): Promise<void> {
        try {

            const data = await this.invoiceRepository.fetchData({});

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully fetch all invoices",
                data
            });

        }catch(err: any){
            this.httpHelper.Response({
                res,
                status: "error",
                message: err.message
            })
    }
}
}