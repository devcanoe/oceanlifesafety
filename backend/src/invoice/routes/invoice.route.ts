import { Router } from "express";
import { container } from 'tsyringe';
import InvoiceController from "../controller/invoice.controller";

const invoiceRouter = Router();
const invoiceController = container.resolve(InvoiceController);

invoiceRouter.post('/create', (req, res, next)=>invoiceController.generateInvoice(req, res, next));
invoiceRouter.patch('/:id', (req, res, next)=>invoiceController.updateInvoice(req, res, next));
invoiceRouter.get('/', (req, res, next)=>invoiceController.fetchInvoices(req, res, next));
invoiceRouter.get('/:id', (req, res, next)=>invoiceController.fetchInvoice(req, res, next));
invoiceRouter.delete('/:id', (req, res, next)=>invoiceController.deleteInvoice(req, res, next));
invoiceRouter.delete('/:id/:itemId', (req, res, next)=>invoiceController.deleteInvoiceItem(req, res, next));

export default invoiceRouter;