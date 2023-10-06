"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cylinderRouter = exports.itemRouter = exports.raftRouter = exports.shipRouter = exports.clientRouter = exports.authRouter = void 0;
const ClientRoute_1 = __importDefault(require("./ClientRoute"));
exports.clientRouter = ClientRoute_1.default;
const AuthRoutes_1 = __importDefault(require("./AuthRoutes"));
exports.authRouter = AuthRoutes_1.default;
const ShipRoutes_1 = __importDefault(require("./ShipRoutes"));
exports.shipRouter = ShipRoutes_1.default;
const RaftRoutes_1 = __importDefault(require("./RaftRoutes"));
exports.raftRouter = RaftRoutes_1.default;
const ItemRoutes_1 = __importDefault(require("./ItemRoutes"));
exports.itemRouter = ItemRoutes_1.default;
const CylinderRoutes_1 = __importDefault(require("./CylinderRoutes"));
exports.cylinderRouter = CylinderRoutes_1.default;
