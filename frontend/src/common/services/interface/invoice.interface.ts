export default interface IGenerateInvoice {
  items: any[];
  receiver_name: string;
  receiver_company: string;
  receiver_address: string;
  sender_address?: string;
  sender_company?: string;
  sender_name?: string;
  invoice_date?: Date;
  due_date?: Date;
  tax?: number;
  sub_total?: number;
  total?: number;
  notes?: string;
  terms?: string;
}
