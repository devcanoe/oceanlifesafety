
import { Response } from 'express';
import { injectable } from "tsyringe";

interface IResponse {
    res: Response;
    status: "success" | "error";
    message: string;
    data?: Record<string, any>
}

@injectable()
export default class Http {

    constructor(){
    }

    Response({res, status, message, data}: IResponse) {

        const response: Response = res.json({
                                status,
                                message,
                                data
                            })
        return response;
    }
}