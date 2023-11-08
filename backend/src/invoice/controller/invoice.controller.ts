import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import GenerateInvoiceService from "../service/generate-invoice.service";
import FetchInvoicesService from "../service/fetch-invoices.service";
import DeleteInvoiceService from "../service/delete-invoice.service";
import FetchInvoiceService from "../service/fetch-invoice.service";
import DeleteInvoiceItemService from "../service/delete-invoice-item.service";
import UpdateInvoiceService from "../service/update-invoice.service";
import Http from "../../common/helper/http.helper";

@injectable()
export default class InvoiceController {
    constructor(
        private generaateInvoiceService: GenerateInvoiceService,
        private fetchInvoicesService: FetchInvoicesService,
        private deleteInvoiceService: DeleteInvoiceService,
        private deleteInvoiceItemService: DeleteInvoiceItemService,
        private fetchInvoiceService: FetchInvoiceService,
        private updateInvoiceService: UpdateInvoiceService,
        private httpHelper: Http
    ){}

    async updateInvoice(req: Request, res: Response, next: NextFunction){
        try{

            const { id } = req.params;

            const response = await this.updateInvoiceService.execute(id, req.body)

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully update invoice",
                data: response
            });
        }catch(err){
            next(err)
        }
    }

    async generateInvoice(req: Request, res: Response, next: NextFunction){
        await this.generaateInvoiceService.execute(req, res, next)
    }
    
    async fetchInvoices(req: Request, res: Response, next: NextFunction){
        await this.fetchInvoicesService.execute(req, res, next)
    }   

    async fetchInvoice(req: Request, res: Response, next: NextFunction){
        await this.fetchInvoiceService.execute(req, res, next)
    }   

    async deleteInvoice(req: Request, res: Response, next: NextFunction) {
        await this.deleteInvoiceService.execute(req, res, next)
    }

    async deleteInvoiceItem(req: Request, res: Response, next: NextFunction) {
        await this.deleteInvoiceItemService.execute(req, res, next)
    }
}