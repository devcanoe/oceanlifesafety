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
const mongoose_1 = __importDefault(require("mongoose"));
const tsyringe_1 = require("tsyringe");
const DB_URL = process.env.MONGODB_URI;
let DatabaseHelper = class DatabaseHelper {
    constructor() { }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose_1.default.set('strictQuery', false);
            yield mongoose_1.default.connect(`${DB_URL}`).then((res) => {
                console.log("Database connected successfully");
            }).catch((err) => {
                console.log("Seems an error occurred while connecting to mongo");
            });
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.disconnect().then((res) => {
                console.log("Database disconnected");
            }).catch((err) => {
                console.log(err.message);
            });
        });
    }
    createData(model, data) {
        try {
            return model.create(data);
        }
        catch (err) {
            return err;
        }
    }
    readData(model, data, select) {
        try {
            return model.find(data, select);
        }
        catch (err) {
            return err.message;
        }
    }
    readSingleData(model, data, select) {
        try {
            return model.findOne(data, select);
        }
        catch (err) {
            return err.message;
        }
    }
    updateData(model, keyword, data) {
        try {
            return model.findOneAndUpdate(keyword, data);
        }
        catch (err) {
            return err.message;
        }
    }
    deleteData(model, keyword) {
        try {
            return model.findByIdAndRemove(keyword);
        }
        catch (err) {
            return err.message;
        }
    }
};
DatabaseHelper = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [])
], DatabaseHelper);
exports.default = DatabaseHelper;
