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
const create_service_1 = __importDefault(require("../services/create.service"));
const deleteship_service_1 = __importDefault(require("../services/deleteship.service"));
const fetchship_1 = __importDefault(require("../services/fetchship"));
const fetchships_service_1 = __importDefault(require("../services/fetchships.service"));
const updateship_service_1 = __importDefault(require("../services/updateship.service"));
let ShipController = class ShipController {
    constructor(createShipService, fetchShipService, fetchShipsService, deleteShipService, updateShipService) {
        this.createShipService = createShipService;
        this.fetchShipService = fetchShipService;
        this.fetchShipsService = fetchShipsService;
        this.deleteShipService = deleteShipService;
        this.updateShipService = updateShipService;
    }
    createShip(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createShipService.execute(req, res, next);
        });
    }
    fetchShip(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fetchShipService.execute(req, res, next);
        });
    }
    fetchShips(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fetchShipsService.execute(req, res, next);
        });
    }
    deleteShip(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteShipService.execute(req, res, next);
        });
    }
    updateShip(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateShipService.execute(req, res, next);
        });
    }
};
ShipController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [create_service_1.default,
        fetchship_1.default,
        fetchships_service_1.default,
        deleteship_service_1.default,
        updateship_service_1.default])
], ShipController);
exports.default = ShipController;
