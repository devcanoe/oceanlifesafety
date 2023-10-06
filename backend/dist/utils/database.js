"use strict";
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
exports.deleteData = exports.updateManyData = exports.updateData = exports.readsingleData = exports.readData = exports.createData = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect = (dbname, dbusername, dbpassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(`mongodb+srv://${dbusername}:${dbpassword}@${dbname}.5niks.mongodb.net/oceanlife?retryWrites=true&w=majority`);
        console.log('database connected');
    }
    catch (err) {
        console.log(err);
    }
});
exports.connect = connect;
const createData = (model, data) => {
    try {
        return model.create(data);
    }
    catch (err) {
        return err;
    }
};
exports.createData = createData;
const readData = (model, data, select) => {
    try {
        return model.find(data, select);
    }
    catch (err) {
        return err.message;
    }
};
exports.readData = readData;
const readsingleData = (model, data, select) => {
    try {
        return model.findOne(data, select);
    }
    catch (err) {
        return err.message;
    }
};
exports.readsingleData = readsingleData;
const updateData = (model, keyword, data) => {
    try {
        return model.findOneAndUpdate(keyword, data);
    }
    catch (err) {
        return err.message;
    }
};
exports.updateData = updateData;
const updateManyData = (model, keyword, data) => {
    try {
        return model.updateMany(keyword, data);
    }
    catch (err) {
        return err.message;
    }
};
exports.updateManyData = updateManyData;
const deleteData = (model, keyword) => {
    try {
        return model.findByIdAndRemove(keyword);
    }
    catch (err) {
        return err.message;
    }
};
exports.deleteData = deleteData;
