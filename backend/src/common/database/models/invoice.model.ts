import Base from "./base.model";

export default interface Invoice extends Base {
    ref_no?: string;
    receiver_name?: string;
    receiver_company?: string;
    receiver_address?: string;
    sender_name?: string;
    sender_company?: string;
    sender_address?: string;
    invoice_date?: Date;
    due_date?: Date;
    tax?: number;
    subtotal?: number;
    total?: number;
    notes?: string;
    terms?: string;
    items?: any[];
}

export interface InvoiceItem {
    total?: number;
    description?: string;
    quantity?: number;
    price?: number;
}