"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CertificateController_1 = __importDefault(require("../controllers/CertificateController"));
const tsyringe_1 = require("tsyringe");
const certificateRouter = (0, express_1.Router)();
const certificateController = tsyringe_1.container.resolve(CertificateController_1.default);
certificateRouter.get('/', (req, res) => certificateController.getCertificates(req, res));
certificateRouter.get('/:id', (req, res) => certificateController.getCertificate(req, res));
certificateRouter.post('/create', (req, res) => certificateController.uploadCertificate(req, res));
certificateRouter.delete('/:id', (req, res) => certificateController.removeCertificate(req, res));
exports.default = certificateRouter;
