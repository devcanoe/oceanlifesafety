import { Application, Router } from "express";
import authRouter, { dashboardRouter } from "../auth/routes/auth.route";
import companyRouter from "../company/routes/company.route";
import shipRouter from "../ship/routes/ship.route";
import formRouter from "../forms/routes/form.route";
import raftRouter from "../raft/routes/raft.routes";
import invoiceRouter from "../invoice/routes/invoice.route";
import calendarRouter from "../calendar/routes/calendar.route";
import userRouter from "../users/user.route";
import userAuth from "./middleware/authorization.middleware";
import InvoiceRepository from "./database/repository/invoice.repository";
import { container } from "tsyringe";
import Invoice from "./database/models/invoice.model";

const BASE_URL = "/api/v2";
const searchRouter = Router();

export const setAppRouter = (app: Application) => {
    app.use("/api/v2/auth", authRouter);
    app.use("/api/v2/company", companyRouter);
    app.use("/api/v2/ships", shipRouter);
    app.use("/api/v2/forms", formRouter);
    app.use("/api/v2/rafts", raftRouter);
    app.use(`${BASE_URL}/invoices`, invoiceRouter);
    app.use(`${BASE_URL}/dashboard`, dashboardRouter);
    app.use(`${BASE_URL}/calendar`, calendarRouter);
    app.use(`${BASE_URL}/users`, userRouter);
    app.use("/api/v2", searchRouter.post("/search", userAuth, async (req, res, next)=> {
        try {
            const { invoice_id } = req.body;
            const invoiceRepository = container.resolve(InvoiceRepository);

            let invoices_result: any[] = []

            const invoices = await invoiceRepository.fetchData({
                
            })

            invoices_result = invoices.filter((invoice: Invoice)=> {
                return invoice.ref_no?.includes(invoice_id)
            })

            res.json({
                status: "success",
                message: "successfully get search results",
                data: invoices_result
            })
        }catch(err){
            next(err)
        }
    }));
}