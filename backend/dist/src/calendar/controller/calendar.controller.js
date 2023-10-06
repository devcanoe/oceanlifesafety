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
const add_servicing_service_1 = __importDefault(require("../services/add_servicing.service"));
const delete_servicing_service_1 = __importDefault(require("../services/delete_servicing.service"));
const update_servicing_service_1 = __importDefault(require("../services/update_servicing.service"));
const add_task_service_1 = __importDefault(require("../services/add_task.service"));
const delete_task_service_1 = __importDefault(require("../services/delete_task.service"));
const update_task_service_1 = __importDefault(require("../services/update_task.service"));
const get_task_service_1 = __importDefault(require("../services/get_task.service"));
const get_calendar_service_1 = __importDefault(require("../services/get_calendar.service"));
let CalendarController = class CalendarController {
    constructor(addServicingService, deleteServicingService, updateServicingService, addTaskService, deleteTaskService, updateTaskService, getTaskService, getCalendarService) {
        this.addServicingService = addServicingService;
        this.deleteServicingService = deleteServicingService;
        this.updateServicingService = updateServicingService;
        this.addTaskService = addTaskService;
        this.deleteTaskService = deleteTaskService;
        this.updateTaskService = updateTaskService;
        this.getTaskService = getTaskService;
        this.getCalendarService = getCalendarService;
    }
    addServicing(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addServicingService.execute(req, res, next);
        });
    }
    deleteServicing(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteServicingService.execute(req, res, next);
        });
    }
    updateServicing(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateServicingService.execute(req, res, next);
        });
    }
    addTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addTaskService.execute(req, res, next);
        });
    }
    deleteTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteTaskService.execute(req, res, next);
        });
    }
    updateTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateTaskService.execute(req, res, next);
        });
    }
    getTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getTaskService.execute(req, res, next);
        });
    }
    getCalendar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getCalendarService.execute(req, res, next);
        });
    }
};
CalendarController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [add_servicing_service_1.default,
        delete_servicing_service_1.default,
        update_servicing_service_1.default,
        add_task_service_1.default,
        delete_task_service_1.default,
        update_task_service_1.default,
        get_task_service_1.default,
        get_calendar_service_1.default])
], CalendarController);
exports.default = CalendarController;
