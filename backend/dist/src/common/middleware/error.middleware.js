"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHanlder = void 0;
const custom_error_1 = require("../error/custom.error");
const errorHanlder = (err, req, res, next) => {
    if (err instanceof custom_error_1.CustomError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }
    res.status(500).send({
        errors: [{ message: 'Something went wrong' }]
    });
};
exports.errorHanlder = errorHanlder;
