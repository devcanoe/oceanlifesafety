import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import IService from "../../common/interfaces/service.interface";
import Http from "../../common/helper/http.helper";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import InvoiceRepository from "../../common/database/repository/invoice.repository";

@injectable()
export default class DeleteInvoiceItemService implements IService<Request, Response, NextFunction> {
    constructor(
        private httpHelper: Http,
        private invoiceRepository: InvoiceRepository
    ){
    }

    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, itemId } = req.params;

            const invoice = await this.invoiceRepository.fetchOneData({_id: id});

            // invoice.items?.id(itemId).deleteOne;

            this.httpHelper.Response({
                res,
                status: "success",
                message: "Successfully deleted invoice item"
            })
        } catch (err: any) {
            next(err)
        }
    }

}