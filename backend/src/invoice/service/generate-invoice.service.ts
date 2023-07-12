import { injectable } from "tsyringe";
import { Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import InvoiceRepository from "../../common/database/repository/invoice.repository";
import Http from "../../common/helper/http.helper";
import { generateReference } from "../../common/utils/generate-string";

@injectable()
export default class GenerateInvoiceService implements IService<Request, Response>{
    constructor(
        private httpHelper: Http,
        private invoiceRepository: InvoiceRepository
    ){

    }

    async execute(req: Request, res: Response) {
        try{
            const { items } = req.body;
            
            const generatedInvReference = generateReference("INV");

            const createInvoice = await this.invoiceRepository.addData({
                ref_no: generatedInvReference,
                items
            });

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully create invoice",
                data: createInvoice
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