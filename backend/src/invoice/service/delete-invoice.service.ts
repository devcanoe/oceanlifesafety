import { injectable } from "tsyringe";
import { Request, Response } from "express";
import Http from "../../common/helper/http.helper";
import IService from "../../common/interfaces/service.interface";
import InvoiceRepository from "../../common/database/repository/invoice.repository";


@injectable()
export default class DeleteInvoiceService implements IService<Request, Response> {
    constructor(
        private httpHelper: Http,
        private invoiceRepository: InvoiceRepository
    ){}

    async execute(req: Request, res: Response) {
        try{

            const {id} = req.params;
           
            await this.invoiceRepository.deleteData(id);
            
            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully delete invoice",
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