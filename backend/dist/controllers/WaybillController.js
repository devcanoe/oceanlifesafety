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
const utils_1 = require("../utils");
const tsyringe_1 = require("tsyringe");
const AddWaybill_1 = __importDefault(require("../services/waybill/AddWaybill"));
const DeleteWaybill_1 = __importDefault(require("../services/waybill/DeleteWaybill"));
const GetWaybill_1 = __importDefault(require("../services/waybill/GetWaybill"));
const GetWaybills_1 = __importDefault(require("../services/waybill/GetWaybills"));
let WaybillController = class WaybillController {
    constructor(addWaybill, deleteWaybill, viewWaybill, viewWaybills) {
        this.addWaybill = addWaybill;
        this.deleteWaybill = deleteWaybill;
        this.viewWaybill = viewWaybill;
        this.viewWaybills = viewWaybills;
    }
    uploadWaybill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.addWaybill.execute(req);
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: "image successfully uploaded",
                    data: response
                });
            }
            catch (err) {
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 500,
                    message: err.message,
                });
            }
        });
    }
    removeWaybill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.deleteWaybill.execute(req);
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 500,
                    message: 'waybill successfully removed',
                    data: response
                });
            }
            catch (err) {
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 500,
                    message: err.message,
                });
            }
        });
    }
    getWaybill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.viewWaybill.execute(req);
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: 'Waybill Retrieved',
                    data: response
                });
            }
            catch (err) {
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 500,
                    message: err.message,
                });
            }
        });
    }
    getWaybills(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.viewWaybills.execute(req);
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: 'Waybills Retrieved',
                    data: response
                });
            }
            catch (err) {
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 500,
                    message: err.message,
                });
            }
        });
    }
};
WaybillController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [AddWaybill_1.default,
        DeleteWaybill_1.default,
        GetWaybill_1.default,
        GetWaybills_1.default])
], WaybillController);
exports.default = WaybillController;
