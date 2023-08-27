import 'reflect-metadata';
import app from './app';
import { startServer } from './common/config/server.config';
import { setAppRouter } from './common/router';
require('dotenv').config();



//Start server 
startServer(app);

