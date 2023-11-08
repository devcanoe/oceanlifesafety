import { injectable } from "tsyringe";
import InvoiceRepository from "../../common/database/repository/invoice.repository";

@injectable()
export default class UpdateInvoiceService {
    constructor(
        private invoiceRepository: InvoiceRepository
    ) {

    }

    async execute(invoice_id: string, data: any) {
        return await this.invoiceRepository.updateData({
            _id: invoice_id
        },
        {
            ...data
        }
        )
    }
}