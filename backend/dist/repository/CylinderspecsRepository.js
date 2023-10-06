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
const Cylinderspecs_1 = __importDefault(require("../models/Cylinderspecs"));
const tsyringe_1 = require("tsyringe");
const utils_1 = require("../utils");
let CylinderspecsRepository = class CylinderspecsRepository {
    constructor() {
    }
    addCylinderspecs(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const investment = yield (0, utils_1.createData)(Cylinderspecs_1.default, payload);
            return investment;
        });
    }
    getCylinderspecss(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const investments = yield (0, utils_1.readData)(Cylinderspecs_1.default, payload);
            return investments;
        });
    }
    getCylinderspecs(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const investment = yield (0, utils_1.readsingleData)(Cylinderspecs_1.default, payload);
            return investment;
        });
    }
    updateCylinderspecs(keyword, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const investment = yield (0, utils_1.updateData)(Cylinderspecs_1.default, keyword, data);
            return investment;
        });
    }
    deleteCylinderspecs(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const investment = yield (0, utils_1.deleteData)(Cylinderspecs_1.default, { _id: id });
            return investment;
        });
    }
};
CylinderspecsRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], CylinderspecsRepository);
exports.default = CylinderspecsRepository;
