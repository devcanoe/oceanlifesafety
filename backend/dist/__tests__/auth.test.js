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
const supertest_1 = __importDefault(require("supertest"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const user_repository_1 = __importDefault(require("../common/database/repository/user.repository"));
const app_1 = __importDefault(require("../app"));
const tsyringe_1 = require("tsyringe");
const encrypt_helper_1 = __importDefault(require("../common/helper/encrypt.helper"));
describe('', () => {
    let mongod;
    let userRepository;
    let encryptionHelper;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongod = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = mongod.getUri();
        mongoose_1.default.set('strictQuery', false);
        yield mongoose_1.default.connect(`${uri}`, { dbName: 'testDB' }).then((res) => {
            console.log("Database connected successfully");
        }).catch((err) => {
            console.log("Seems an error occurred while connecting to mongo");
        });
        userRepository = tsyringe_1.container.resolve(user_repository_1.default);
        encryptionHelper = tsyringe_1.container.resolve(encrypt_helper_1.default);
        const port = 5000;
        app_1.default.listen(port);
        // startServer(app)
    }));
    test('', () => __awaiter(void 0, void 0, void 0, function* () {
        const hashedPassword = yield encryptionHelper.hash("password");
        const user = yield userRepository.addData({
            firstname: "john",
            lastname: "doe",
            phone: 2347016181313,
            email: "johndoe@gmail.com",
            password: hashedPassword
        });
        console.log(user);
        const res = yield (0, supertest_1.default)(app_1.default)
            .post(`/api/v2/auth/login`)
            .send({
            email: "johndoe@gmail.com",
            password: "password"
        });
        console.log(res.body);
        // expect(res.statusCode).toBe(200);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // await stopServer()
        mongod.stop();
    }));
});
