import { Invoice } from "@/common/model/invoice.model";

export default interface IGenerateInvoice {
  ticket: string;
  fields: Invoice[];
}
