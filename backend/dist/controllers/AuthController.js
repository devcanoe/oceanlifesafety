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
const login_1 = __importDefault(require("../services/auth/login"));
const utils_1 = require("../utils");
const register_1 = __importDefault(require("../services/auth/register"));
let AuthController = class AuthController {
    constructor(loginService, registerService) {
        this.loginService = loginService;
        this.registerService = registerService;
    }
    //login investor
    Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.loginService.execute(req.body);
                if (token === false) {
                    return new utils_1.Http().Response({
                        res: res,
                        statuscode: 401,
                        message: "User not authorized",
                    });
                }
                const data = {
                    token: token.token,
                    user: {
                        firstname: token.username,
                        id: token.id,
                    }
                };
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: "User authorized",
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
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.registerService.execute(req);
                if (response === 'EXIST') {
                    return new utils_1.Http().Response({
                        res: res,
                        statuscode: 401,
                        message: "Account Exists",
                    });
                }
                new utils_1.Http().Response({
                    res: res,
                    statuscode: 200,
                    message: "User Registered",
                    data: response
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
AuthController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [login_1.default,
        register_1.default])
], AuthController);
exports.default = AuthController;
