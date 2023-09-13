import 'reflect-metadata';
import app from './app';
import { startServer } from './common/config/server.config';
require('dotenv').config();

//Start server 
startServer(app);

