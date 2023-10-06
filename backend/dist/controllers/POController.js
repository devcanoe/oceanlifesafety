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
const AddPO_1 = __importDefault(require("../services/po/AddPO"));
const DeletePO_1 = __importDefault(require("../services/po/DeletePO"));
const GetPO_1 = __importDefault(require("../services/po/GetPO"));
const GetPOs_1 = __importDefault(require("../services/po/GetPOs"));
let POController = class POController {
    constructor(addPO, deletePO, viewPO, viewPOs) {
        this.addPO = addPO;
        this.deletePO = deletePO;
        this.viewPO = viewPO;
        this.viewPOs = viewPOs;
    }
    uploadPO(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.addPO.execute(req);
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
    removePO(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.deletePO.execute(req);
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: 'PO successfully removed',
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
    getPO(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.viewPO.execute(req);
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: 'PO Retrieved',
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
    getPOs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.viewPOs.execute(req);
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: 'POs Retrieved',
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
POController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [AddPO_1.default,
        DeletePO_1.default,
        GetPO_1.default,
        GetPOs_1.default])
], POController);
exports.default = POController;
