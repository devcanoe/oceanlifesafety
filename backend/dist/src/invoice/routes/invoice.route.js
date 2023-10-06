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
invoiceRouter.post('/create', (req, res, next) => invoiceController.generateInvoice(req, res, next));
invoiceRouter.get('/', (req, res, next) => invoiceController.fetchInvoices(req, res, next));
invoiceRouter.get('/:id', (req, res, next) => invoiceController.fetchInvoice(req, res, next));
invoiceRouter.delete('/:id', (req, res, next) => invoiceController.deleteInvoice(req, res, next));
invoiceRouter.delete('/:id/:itemId', (req, res, next) => invoiceController.deleteInvoiceItem(req, res, next));
exports.default = invoiceRouter;
