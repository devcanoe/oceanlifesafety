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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
let FileService = class FileService {
    constructor() {
        this.s3 = new aws_sdk_1.default.S3({
            credentials: {
                accessKeyId: process.env.ACCESSKEYID ? process.env.ACCESSKEYID : '',
                secretAccessKey: process.env.SECRETACCESSKEY ? process.env.SECRETACCESSKEY : ''
            }
        });
        aws_sdk_1.default.config.update({ region: 'us-east-1' });
    }
    uploadFile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { files } = req.body;
            const fileName = files.file.name;
            const albumPhotosKey = encodeURIComponent(files.file.name) + "/";
            const photoKey = albumPhotosKey + fileName;
            const uploadParams = {
                Bucket: '',
                Key: photoKey,
                Body: files.file,
            };
            const uploadFile = new aws_sdk_1.default.S3.ManagedUpload({ params: uploadParams });
            return uploadFile.promise();
        });
    }
    viewFile(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.s3.getObject({ Bucket: '', Key: fileName }).promise();
            return file.Body;
        });
    }
    deleteFile(req) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    fileList(req) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
FileService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], FileService);
exports.default = FileService;
