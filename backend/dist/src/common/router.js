"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAppRouter = void 0;
const auth_route_1 = __importStar(require("../auth/routes/auth.route"));
const company_route_1 = __importDefault(require("../company/routes/company.route"));
const ship_route_1 = __importDefault(require("../ship/routes/ship.route"));
const form_route_1 = __importDefault(require("../forms/routes/form.route"));
const raft_routes_1 = __importDefault(require("../raft/routes/raft.routes"));
const invoice_route_1 = __importDefault(require("../invoice/routes/invoice.route"));
const calendar_route_1 = __importDefault(require("../calendar/routes/calendar.route"));
const BASE_URL = "/api/v2";
const setAppRouter = (app) => {
    app.use("/api/v2/auth", auth_route_1.default);
    app.use("/api/v2/company", company_route_1.default);
    app.use("/api/v2/ships", ship_route_1.default);
    app.use("/api/v2/forms", form_route_1.default);
    app.use("/api/v2/rafts", raft_routes_1.default);
    app.use(`${BASE_URL}/invoices`, invoice_route_1.default);
    app.use(`${BASE_URL}/dashboard`, auth_route_1.dashboardRouter);
    app.use(`${BASE_URL}/calendar`, calendar_route_1.default);
};
exports.setAppRouter = setAppRouter;
