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
require("reflect-metadata");
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const utils_1 = require("./src/utils");
const Index_1 = require("./src/routes/Index");
const CertificateRoutes_1 = __importDefault(require("./src/routes/CertificateRoutes"));
const PORoutes_1 = __importDefault(require("./src/routes/PORoutes"));
const WaybillRoutes_1 = __importDefault(require("./src/routes/WaybillRoutes"));
const app = (0, express_1.default)();
//Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});
//Routes
app.use("/api/v2/auth", Index_1.authRouter);
app.use("/api/v2/clients", Index_1.clientRouter);
app.use("/api/v2/ships", Index_1.shipRouter);
app.use("/api/v2/rafts", Index_1.raftRouter);
app.use("/api/v2/items", Index_1.itemRouter);
app.use("/api/v2/cylinders", Index_1.cylinderRouter);
app.use("/api/v2/certificate", CertificateRoutes_1.default);
app.use("/api/v2/po", PORoutes_1.default);
app.use("/api/v2/waybill", WaybillRoutes_1.default);
//Start server 
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, utils_1.connect)("taskmanager", "maceteli", "yuppies1998");
        const port = process.env.PORT || "5000";
        app.listen(port, () => { console.log(`listening to port ${port}`); });
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
