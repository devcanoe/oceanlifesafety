import { Application } from "express";
import authRouter, { dashboardRouter } from "../auth/routes/auth.route";
import companyRouter from "../company/routes/company.route";
import shipRouter from "../ship/routes/ship.route";
import formRouter from "../forms/routes/form.route";
import raftRouter from "../raft/routes/raft.routes";
import invoiceRouter from "../invoice/routes/invoice.route";
import calendarRouter from "../calendar/routes/calendar.route";
import userRouter from "../users/user.route";

const BASE_URL = "/api/v2";

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
}