import 'reflect-metadata';
require('dotenv').config();
import express, {Application, NextFunction, Request, Response} from 'express';
import { setAppRouter } from './common/router';
import { startServer } from './common/config/server.config';

const app: Application = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use((req: Request , res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

//Routes
setAppRouter(app);

export default app;

