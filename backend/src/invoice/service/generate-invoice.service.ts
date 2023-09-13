import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import InvoiceRepository from "../../common/database/repository/invoice.repository";
import Http from "../../common/helper/http.helper";
import { generateReference } from "../../common/utils/generate-string";

@injectable()
export default class GenerateInvoiceService implements IService<Request, Response, NextFunction>{
    constructor(
        private httpHelper: Http,
        private invoiceRepository: InvoiceRepository
    ){

    }

    async execute(req: Request, res: Response, next: NextFunction) {
        try{
            const { 
                items, 
                receiver_name, 
                receiver_company, 
                receiver_address,
                sender_address,
                sender_company,
                sender_name,
                invoice_date,
                due_date,
                tax,
                subtotal,
                notes,
                terms
            } = req.body;
            
            const generatedInvReference = generateReference("INV");

            const createInvoice = await this.invoiceRepository.addData({
                ref_no: generatedInvReference,
                receiver_name, 
                receiver_company, 
                receiver_address,
                sender_address,
                sender_company,
                sender_name,
                invoice_date,
                due_date,
                tax,
                notes,
                terms,
                subtotal,
                items
            });

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully create invoice",
                data: createInvoice
            });

        }catch(err: any){
            next(err)
        }
    }
}