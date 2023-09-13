import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import GenerateInvoiceService from "../service/generate-invoice.service";
import FetchInvoicesService from "../service/fetch-invoices.service";
import DeleteInvoiceService from "../service/delete-invoice.service";
import FetchInvoiceService from "../service/fetch-invoice.service";
import DeleteInvoiceItemService from "../service/delete-invoice-item.service";

@injectable()
export default class InvoiceController {
    constructor(
        private generaateInvoiceService: GenerateInvoiceService,
        private fetchInvoicesService: FetchInvoicesService,
        private deleteInvoiceService: DeleteInvoiceService,
        private deleteInvoiceItemService: DeleteInvoiceItemService,
        private fetchInvoiceService: FetchInvoiceService
    ){}

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