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
const token_helper_1 = __importDefault(require("../helper/token.helper"));
const tsyringe_1 = require("tsyringe");
const user_repository_1 = __importDefault(require("../database/repository/user.repository"));
const SECRET_KEY = process.env.SECRET_KEY || "";
const tokenHelper = tsyringe_1.container.resolve(token_helper_1.default);
const userRepository = tsyringe_1.container.resolve(user_repository_1.default);
function userAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.split(' ')[1]) {
                res.json({
                    status: "error",
                    message: 'Not authorized to take this action'
                });
            }
            const accesstoken = authHeader && authHeader.split(' ')[1];
            const verifyToken = yield tokenHelper.verify(accesstoken, `${SECRET_KEY}`);
            if (!verifyToken) {
                res.json({
                    status: "error",
                    message: 'Not authorized to take this action'
                });
            }
            else {
                req.body.user = verifyToken;
            }
            next();
        }
        catch (err) {
            res.json({
                status: "error",
                message: err.message
            });
            next();
        }
    });
}
exports.default = userAuth;
