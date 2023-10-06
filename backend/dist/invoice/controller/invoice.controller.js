"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const generate_invoice_service_1 = __importDefault(require("../service/generate-invoice.service"));
const fetch_invoices_service_1 = __importDefault(require("../service/fetch-invoices.service"));
const delete_invoice_service_1 = __importDefault(require("../service/delete-invoice.service"));
const fetch_invoice_service_1 = __importDefault(require("../service/fetch-invoice.service"));
const delete_invoice_item_service_1 = __importDefault(require("../service/delete-invoice-item.service"));
let InvoiceController = class InvoiceController {
    constructor(generaateInvoiceService, fetchInvoicesService, deleteInvoiceService, deleteInvoiceItemService, fetchInvoiceService) {
        this.generaateInvoiceService = generaateInvoiceService;
        this.fetchInvoicesService = fetchInvoicesService;
        this.deleteInvoiceService = deleteInvoiceService;
        this.deleteInvoiceItemService = deleteInvoiceItemService;
        this.fetchInvoiceService = fetchInvoiceService;
    }
    generateInvoice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.generaateInvoiceService.execute(req, res);
        });
    }
    fetchInvoices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fetchInvoicesService.execute(req, res);
        });
    }
    fetchInvoice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fetchInvoiceService.execute(req, res);
        });
    }
    deleteInvoice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteInvoiceService.execute(req, res);
        });
    }
    deleteInvoiceItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteInvoiceItemService.execute(req, res);
        });
    }
};
InvoiceController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [generate_invoice_service_1.default,
        fetch_invoices_service_1.default,
        delete_invoice_service_1.default,
        delete_invoice_item_service_1.default,
        fetch_invoice_service_1.default])
], InvoiceController);
exports.default = InvoiceController;
