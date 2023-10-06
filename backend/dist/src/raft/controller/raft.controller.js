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
const delete_raft_service_1 = __importDefault(require("../services/delete-raft.service"));
const getrafts_service_1 = __importDefault(require("../services/getrafts.service"));
const create_raft_service_1 = __importDefault(require("../services/create-raft.service"));
const getraft_service_1 = __importDefault(require("../services/getraft.service"));
const update_raft_service_1 = __importDefault(require("../services/update-raft.service"));
let RaftController = class RaftController {
    constructor(createRaftService, deleteRaftService, getRaftsService, getRaftService, updateRaftService) {
        this.createRaftService = createRaftService;
        this.deleteRaftService = deleteRaftService;
        this.getRaftsService = getRaftsService;
        this.getRaftService = getRaftService;
        this.updateRaftService = updateRaftService;
    }
    createRaft(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createRaftService.execute(req, res, next);
        });
    }
    deleteRaft(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteRaftService.execute(req, res, next);
        });
    }
    getRafts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getRaftsService.execute(req, res, next);
        });
    }
    getRaft(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getRaftService.execute(req, res, next);
        });
    }
    updateRaft(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateRaftService.execute(req, res, next);
        });
    }
};
RaftController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [create_raft_service_1.default,
        delete_raft_service_1.default,
        getrafts_service_1.default,
        getraft_service_1.default,
        update_raft_service_1.default])
], RaftController);
exports.default = RaftController;
