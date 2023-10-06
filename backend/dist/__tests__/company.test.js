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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
describe('', () => {
    let mongod;
    let userRepository;
    let loginService;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // mongod = await MongoMemoryServer.create();
        // const uri = mongod.getUri();
        // mongoose.set('strictQuery', false);
        // await mongoose.connect(`${uri}`,{dbName: 'testDB'}).then((res: any)=> {
        //     console.log("Database connected successfully")
        // }).catch((err: any)=>{
        //     console.log("Seems an error occurred while connecting to mongo")
        // });
        // const port = 5000
        // app.listen(port)
    }));
    test('', () => __awaiter(void 0, void 0, void 0, function* () {
        // const auth = await loginService.execute(req, res);
        // const res = await request(app)
        // .post(`/api/v2/company/create`)
        // .set('authorization', `Bearer `)
        // .send({
        //   name: "shell"
        // });
        // expect(res.statusCode).toBe(200);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // await stopServer()
        // app.on('end', () => {
        //     console.log('disconnect')
        // });
        // mongod.stop()
    }));
});
