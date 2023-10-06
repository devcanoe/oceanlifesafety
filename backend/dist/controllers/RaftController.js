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
const utils_1 = require("../utils");
const AddRaft_1 = __importDefault(require("../services/rafts/AddRaft"));
const ViewRafts_1 = __importDefault(require("../services/rafts/ViewRafts"));
const ViewRaft_1 = __importDefault(require("../services/rafts/ViewRaft"));
const DeleteRaft_1 = __importDefault(require("../services/rafts/DeleteRaft"));
const UpdateRaft_1 = __importDefault(require("../services/rafts/UpdateRaft"));
let RaftController = class RaftController {
    constructor(createData, getDatas, viewData, deleteData, updateData) {
        this.createData = createData;
        this.getDatas = getDatas;
        this.viewData = viewData;
        this.deleteData = deleteData;
        this.updateData = updateData;
    }
    createRaft(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteData = yield this.createData.execute(req.body);
                if (deleteData === false) {
                    return new utils_1.Http().Response({
                        res: res,
                        statuscode: 400,
                        message: "Raft exists",
                    });
                }
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: "Raft created",
                    data: deleteData
                });
            }
            catch (err) {
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 500,
                    message: err.message
                });
            }
        });
    }
    getAllRaft(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.getDatas.execute(req);
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: "Ships Rafts retrieved",
                    data: data
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
    getRaft(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield this.viewData.execute(req.params.id);
                if (exist === null) {
                    new utils_1.Http().Response({
                        res: res,
                        statuscode: 404,
                        message: "Data not found",
                    });
                    return;
                }
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: "Data retrieved",
                    data: exist
                });
            }
            catch (err) {
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 500,
                    message: err.message
                });
            }
        });
    }
    deleteRaft(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.deleteData.execute(req.params.id);
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: "Raft deleted"
                });
            }
            catch (err) {
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 500,
                    message: err.message
                });
            }
        });
    }
    updateRaft(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.updateData.execute(req.params.id, req.body);
                if (data === null) {
                    res.json({
                        status: 404,
                        message: "No data found"
                    });
                    return;
                }
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: "Updated Raft",
                    data: data
                });
            }
            catch (err) {
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 500,
                    message: err.message
                });
            }
        });
    }
};
RaftController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [AddRaft_1.default,
        ViewRafts_1.default,
        ViewRaft_1.default,
        DeleteRaft_1.default,
        UpdateRaft_1.default])
], RaftController);
exports.default = RaftController;
