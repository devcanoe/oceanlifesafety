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
const http_helper_1 = __importDefault(require("../../common/helper/http.helper"));
const company_repository_1 = __importDefault(require("../../common/database/repository/company.repository"));
const ship_repository_1 = __importDefault(require("../../common/database/repository/ship.repository"));
const raft_repository_1 = __importDefault(require("../../common/database/repository/raft.repository"));
const form_repository_1 = __importDefault(require("../../common/database/repository/form.repository"));
const log_repository_1 = __importDefault(require("../../common/database/repository/log.repository"));
let DashboardService = class DashboardService {
    constructor(httpHelper, companyRepository, shipRepository, raftRepository, formRepository, logRepository) {
        this.httpHelper = httpHelper;
        this.companyRepository = companyRepository;
        this.shipRepository = shipRepository;
        this.raftRepository = raftRepository;
        this.formRepository = formRepository;
        this.logRepository = logRepository;
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const company = yield this.companyRepository.fetchData({});
                const ship = yield this.shipRepository.fetchData({});
                const raft = yield this.raftRepository.fetchData({});
                const form = yield this.formRepository.fetchData({});
                const tableData = yield this.logRepository.fetchData({});
                this.httpHelper.Response({
                    res,
                    status: "error",
                    message: "successfully fetch dashboard data",
                    data: {
                        company: company.length,
                        ship: ship.length,
                        raft: raft.length,
                        form: form.length,
                        table: tableData
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
DashboardService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [http_helper_1.default,
        company_repository_1.default,
        ship_repository_1.default,
        raft_repository_1.default,
        form_repository_1.default,
        log_repository_1.default])
], DashboardService);
exports.default = DashboardService;
