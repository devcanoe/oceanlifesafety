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
const encrypt_helper_1 = __importDefault(require("../../common/helper/encrypt.helper"));
const http_helper_1 = __importDefault(require("../../common/helper/http.helper"));
const token_helper_1 = __importDefault(require("../../common/helper/token.helper"));
const user_repository_1 = __importDefault(require("../../common/database/repository/user.repository"));
const log_repository_1 = __importDefault(require("../../common/database/repository/log.repository"));
const SECRET_KEY = process.env.SECRET_KEY || "";
let LoginService = class LoginService {
    constructor(userRepository, encryptionHelper, logRepository, tokenHelper, httpHelper) {
        this.userRepository = userRepository;
        this.encryptionHelper = encryptionHelper;
        this.logRepository = logRepository;
        this.tokenHelper = tokenHelper;
        this.httpHelper = httpHelper;
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                //check if user exists
                const user = yield this.userRepository.fetchOneData({ email });
                if (!user) {
                    throw (new Error("Invalid email/password"));
                }
                // //compare encrypted password
                const checkpassword = yield this.encryptionHelper.compareHash(password, user.password);
                if (!checkpassword) {
                    throw (new Error("Invalid email/password"));
                }
                //generate user token for authorization
                const userdetails = {
                    firstname: user.firstname,
                    email: user.email,
                    id: user._id,
                };
                const generatedToken = yield this.tokenHelper.generate(userdetails, SECRET_KEY);
                yield this.logRepository.addData({
                    description: `${user.email} successfully logged in`,
                    user: user._id
                });
                this.httpHelper.Response({
                    res,
                    status: "success",
                    message: "Successfully Authorized User",
                    data: {
                        token: generatedToken,
                        user: {
                            firstname: user.firstname,
                            lastname: user.lastname,
                            email: user.email,
                            id: user._id,
                        }
                    }
                });
            }
            catch (err) {
                this.httpHelper.Response({
                    res,
                    status: "error",
                    message: err.message
                });
            }
        });
    }
};
LoginService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [user_repository_1.default,
        encrypt_helper_1.default,
        log_repository_1.default,
        token_helper_1.default,
        http_helper_1.default])
], LoginService);
exports.default = LoginService;
