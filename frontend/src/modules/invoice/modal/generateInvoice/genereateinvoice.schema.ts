import * as yup from "yup";

export const generateInvoiceSchema = yup.object({
  receiver_name: yup.string().required("Receiver name is required"),
  receiver_company: yup.string().required("Receiver company is required"),
  receiver_address: yup.string().required("Receiver address is required"),
  sender_name: yup.string().required("Sender name is required"),
  sender_company: yup.string().required("Sender company is required"),
  sender_address: yup.string().required("Sender address is required"),
  invoice_date: yup.string().required("Invoice_date is required"),
  due_date: yup.string().required("Due date is required"),
  tax: yup.number().required("Tax is required"),
  subtotal: yup.number(),
  total: yup.number(),
  notes: yup.string(),
  terms: yup.string(),
});

export const formValidationSchema = yup.object({
  description: yup.string().required("Description is required"),
  quantity: yup.number().min(1).required("Quantity is required"),
  price: yup.number().min(1).required("Price is required"),
});
