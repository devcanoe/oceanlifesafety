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
const create_eepd_service_1 = __importDefault(require("../services/create_eepd.service"));
const create_bacl_service_1 = __importDefault(require("../services/create-bacl.service"));
const create_pfecl_service_1 = __importDefault(require("../services/create-pfecl.service"));
const getforms_service_1 = __importDefault(require("../services/getforms.service"));
const delete_form_service_1 = __importDefault(require("../services/delete-form.service"));
const get_form_service_1 = __importDefault(require("../services/get_form.service"));
const update_form_service_1 = __importDefault(require("../services/update-form.service"));
let FormController = class FormController {
    constructor(createEEPDService, createBACLService, createPFECLService, getFormsService, getFormService, deleteFormService, updateFormService) {
        this.createEEPDService = createEEPDService;
        this.createBACLService = createBACLService;
        this.createPFECLService = createPFECLService;
        this.getFormsService = getFormsService;
        this.getFormService = getFormService;
        this.deleteFormService = deleteFormService;
        this.updateFormService = updateFormService;
    }
    createEEBD(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createEEPDService.execute(req, res, next);
        });
    }
    createBACL(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createBACLService.execute(req, res, next);
        });
    }
    createPFECL(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createPFECLService.execute(req, res, next);
        });
    }
    getForms(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getFormsService.execute(req, res, next);
        });
    }
    getForm(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getFormService.execute(req, res, next);
        });
    }
    deleteForm(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteFormService.execute(req, res, next);
        });
    }
    updateForm(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateFormService.execute(req, res, next);
        });
    }
};
FormController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [create_eepd_service_1.default,
        create_bacl_service_1.default,
        create_pfecl_service_1.default,
        getforms_service_1.default,
        get_form_service_1.default,
        delete_form_service_1.default,
        update_form_service_1.default])
], FormController);
exports.default = FormController;
