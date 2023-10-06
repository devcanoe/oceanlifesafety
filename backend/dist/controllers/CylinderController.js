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
const AddCylinder_1 = __importDefault(require("../services/cylinders/AddCylinder"));
const ViewCylinders_1 = __importDefault(require("../services/cylinders/ViewCylinders"));
const ViewCylinder_1 = __importDefault(require("../services/cylinders/ViewCylinder"));
const DeleteCylinder_1 = __importDefault(require("../services/cylinders/DeleteCylinder"));
const UpdateCylinder_1 = __importDefault(require("../services/cylinders/UpdateCylinder"));
let CylinderController = class CylinderController {
    constructor(createData, getDatas, viewData, deleteData, updateData) {
        this.createData = createData;
        this.getDatas = getDatas;
        this.viewData = viewData;
        this.deleteData = deleteData;
        this.updateData = updateData;
    }
    createCylinder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.createData.execute(req.body);
                if (user === false) {
                    return new utils_1.Http().Response({
                        res: res,
                        statuscode: 400,
                        message: "Cylinder exists",
                    });
                }
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: "Cylinder created",
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
    getAllCylinder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.getDatas.execute();
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: "Cylinders retrieved",
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
    getCylinder(req, res) {
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
    deleteCylinder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.deleteData.execute(req.params.id);
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: "Cylinder deleted"
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
    updateCylinder(req, res) {
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
                    message: "Updated Ship",
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
CylinderController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [AddCylinder_1.default,
        ViewCylinders_1.default,
        ViewCylinder_1.default,
        DeleteCylinder_1.default,
        UpdateCylinder_1.default])
], CylinderController);
exports.default = CylinderController;
