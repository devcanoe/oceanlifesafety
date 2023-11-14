import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/custom.error";

export const errorHanlder = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }
    
    res.status(500).send({
        errors: [{ message: err.message }]
    });
}