"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
class S3 {
    constructor(region, apiVersion) {
        this.region = region;
        this.apiVersion = apiVersion;
    }
    upload() {
        //set region
        aws_sdk_1.default.config.update({ region: this.region });
        //create s3 service object
        let s3 = new aws_sdk_1.default.S3({ apiVersion: this.apiVersion });
    }
}
exports.default = S3;
