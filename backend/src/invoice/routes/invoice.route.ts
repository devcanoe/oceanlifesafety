import { Router } from "express";
import { container } from 'tsyringe';
import InvoiceController from "../controller/invoice.controller";

const invoiceRouter = Router();
const invoiceController = container.resolve(InvoiceController);

invoiceRouter.post('/create', (req, res)=>invoiceController.generateInvoice(req, res));
invoiceRouter.get('/', (req, res)=>invoiceController.fetchInvoices(req, res));
invoiceRouter.get('/:id', (req, res)=>invoiceController.fetchInvoice(req, res));
invoiceRouter.delete('/:id', (req, res)=>invoiceController.deleteInvoice(req, res));
invoiceRouter.delete('/:id/:itemId', (req, res)=>invoiceController.deleteInvoiceItem(req, res));

export default invoiceRouter;