"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const invoice_controller_1 = __importDefault(require("../controller/invoice.controller"));
const invoiceRouter = (0, express_1.Router)();
const invoiceController = tsyringe_1.container.resolve(invoice_controller_1.default);
invoiceRouter.post('/create', (req, res) => invoiceController.generateInvoice(req, res));
invoiceRouter.get('/', (req, res) => invoiceController.fetchInvoices(req, res));
invoiceRouter.get('/:id', (req, res) => invoiceController.fetchInvoice(req, res));
invoiceRouter.delete('/:id', (req, res) => invoiceController.deleteInvoice(req, res));
invoiceRouter.delete('/:id/:itemId', (req, res) => invoiceController.deleteInvoiceItem(req, res));
exports.default = invoiceRouter;
