import Base from "./base.model";

export interface InvoiceItem extends Base {
  description?: string;
  quantity?: number;
  price?: number;
  total?: number;
}

export interface Invoice extends Base {
  ref_no?: string;
  receiver_company?: string;
  due_date?: Date;
  total?: number;
  items?: InvoiceItem[];
}
