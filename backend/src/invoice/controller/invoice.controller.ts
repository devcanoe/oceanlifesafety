import { injectable } from "tsyringe";
import { Request, Response } from "express";
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

    async generateInvoice(req: Request, res: Response){
        await this.generaateInvoiceService.execute(req, res)
    }
    
    async fetchInvoices(req: Request, res: Response){
        await this.fetchInvoicesService.execute(req, res)
    }   

    async fetchInvoice(req: Request, res: Response){
        await this.fetchInvoiceService.execute(req, res)
    }   

    async deleteInvoice(req: Request, res: Response) {
        await this.deleteInvoiceService.execute(req, res)
    }

    async deleteInvoiceItem(req: Request, res: Response) {
        await this.deleteInvoiceItemService.execute(req, res)
    }
}