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
const AddClient_1 = __importDefault(require("../services/clients/AddClient"));
const ViewClients_1 = __importDefault(require("../services/clients/ViewClients"));
const ViewClient_1 = __importDefault(require("../services/clients/ViewClient"));
const DeleteClient_1 = __importDefault(require("../services/clients/DeleteClient"));
const UpdateClient_1 = __importDefault(require("../services/clients/UpdateClient"));
let ClientController = class ClientController {
    constructor(create, getClients, viewClient, deleteData, updateData) {
        this.create = create;
        this.getClients = getClients;
        this.viewClient = viewClient;
        this.deleteData = deleteData;
        this.updateData = updateData;
    }
    createClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.create.execute(req.body);
                if (user === false) {
                    return new utils_1.Http().Response({
                        res: res,
                        statuscode: 400,
                        message: "Client exists",
                    });
                }
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: "Client exists",
                    data: user
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
    getAllClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.getClients.execute();
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: "Clients retrieved",
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
    getClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield this.viewClient.execute(req.params.id);
                if (!exist) {
                    return new utils_1.Http().Response({
                        res: res,
                        statuscode: 404,
                        message: "Client not found",
                    });
                }
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: "Client retrieved",
                    data: exist
                });
            }
            catch (err) {
                res.json({
                    status: 500,
                    message: err.message
                });
                return;
            }
        });
    }
    deleteClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.deleteData.execute(req.params.id);
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: "Client deleted"
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
    updateClient(req, res) {
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
                    message: "Updated Client",
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
ClientController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [AddClient_1.default,
        ViewClients_1.default,
        ViewClient_1.default,
        DeleteClient_1.default,
        UpdateClient_1.default])
], ClientController);
exports.default = ClientController;
