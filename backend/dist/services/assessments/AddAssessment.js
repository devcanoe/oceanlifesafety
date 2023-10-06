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
const AssessmentRepository_1 = __importDefault(require("../../repository/AssessmentRepository"));
const CylinderspecsRepository_1 = __importDefault(require("../../repository/CylinderspecsRepository"));
let AddShip = class AddShip {
    constructor(assessmentRepository, cylinderSpecsRepository) {
        this.assessmentRepository = assessmentRepository;
        this.cylinderSpecsRepository = cylinderSpecsRepository;
    }
    execute(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const assessmentData = {
                service_date: payload.service_date,
                raft: payload.raft,
                client_rep: payload.client_rep,
                service_agent: payload.service_agent
            };
            const createassessment = yield this.assessmentRepository.addAssessment(assessmentData);
            if (!createassessment) {
                return false;
            }
            //create cylinder 1
            const cylinderoneData = {
                assessment: createassessment._id,
                cylinder: payload.c1,
                hydro_date: payload.c1_hydro_date,
                gasweightco2: payload.c1_gwco2,
                gasweightn2: payload.c1_gwn2,
                taraweightco2: payload.c1_twco2,
                taraweightn2: payload.c1_twn2,
                fullweightco2: payload.c1_fwco2,
                fullweightn2: payload.c1_fwn2
            };
            yield this.cylinderSpecsRepository.addCylinderspecs(cylinderoneData);
            //create cylinder 2
            const cylindertwoData = {
                assessment: createassessment._id,
                cylinder: payload.c2,
                hydro_date: payload.c2_hydro_date,
                gasweightco2: payload.c2_gwco2,
                gasweightn2: payload.c2_gwn2,
                taraweightco2: payload.c2_twco2,
                taraweightn2: payload.c2_twn2,
                fullweightco2: payload.c2_fwco2,
                fullweightn2: payload.c2_fwn2
            };
            yield this.cylinderSpecsRepository.addCylinderspecs(cylindertwoData);
            //adding assessment items
            return createassessment;
        });
    }
};
AddShip = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [AssessmentRepository_1.default,
        CylinderspecsRepository_1.default])
], AddShip);
exports.default = AddShip;
