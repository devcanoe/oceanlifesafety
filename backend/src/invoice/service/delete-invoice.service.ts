import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import Http from "../../common/helper/http.helper";
import IService from "../../common/interfaces/service.interface";
import InvoiceRepository from "../../common/database/repository/invoice.repository";


@injectable()
export default class DeleteInvoiceService implements IService<Request, Response, NextFunction> {
    constructor(
        private httpHelper: Http,
        private invoiceRepository: InvoiceRepository
    ){}

    async execute(req: Request, res: Response, next: NextFunction) {
        try{

            const {id} = req.params;
           
            await this.invoiceRepository.deleteData(id);
            
            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully delete invoice",
            });
 
        }catch(err: any){
            next(err)
        }
    }
}