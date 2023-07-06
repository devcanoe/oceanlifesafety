import { Application } from "express";
import authRouter from "../auth/routes/auth.route";
import companyRouter from "../company/routes/company.route";
import shipRouter from "../ship/routes/ship.route";
import formRouter from "../forms/routes/form.route";

export const setAppRouter = (app: Application) => {
    app.use("/api/v2/auth", authRouter);
    app.use("/api/v2/company", companyRouter);
    app.use("/api/v2/ships", shipRouter);
    app.use("/api/v2/forms", formRouter);
}