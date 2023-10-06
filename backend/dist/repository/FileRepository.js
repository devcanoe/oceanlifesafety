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
const ItemModel_1 = __importDefault(require("../models/ItemModel"));
const tsyringe_1 = require("tsyringe");
const utils_1 = require("../utils");
let FileRepository = class FileRepository {
    constructor() { }
    addFile(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const investment = yield (0, utils_1.createData)(ItemModel_1.default, payload);
            return investment;
        });
    }
    getFiles(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const investments = yield (0, utils_1.readData)(ItemModel_1.default, payload);
            return investments;
        });
    }
    getFile(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const investment = yield (0, utils_1.readsingleData)(ItemModel_1.default, payload);
            return investment;
        });
    }
    updateFile(keyword, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const investment = yield (0, utils_1.updateData)(ItemModel_1.default, keyword, data);
            return investment;
        });
    }
    deleteFile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const investment = yield (0, utils_1.deleteData)(ItemModel_1.default, { _id: id });
            return investment;
        });
    }
};
FileRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], FileRepository);
exports.default = FileRepository;
