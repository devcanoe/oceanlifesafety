import "reflect-metadata"
import express, { Application } from "express";
import request from "supertest";
import { MongoMemoryServer } from 'mongodb-memory-server';
import { startServer, stopServer } from "../src/common/config/server.config";
import mongoose from "mongoose";
import UserRepository from "../src/common/database/repository/user.repository";

describe('', () => {
    let app = express();
    let mongod: any;
    let userRepository: UserRepository;

    beforeAll(async ()=> {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        mongoose.set('strictQuery', false);
        await mongoose.connect(`${uri}`).then((res: any)=> {
            console.log("Database connected successfully")
        }).catch((err: any)=>{
            console.log("Seems an error occurred while connecting to mongo")
        })

        const port = 5000

        app.listen(port, () => { console.log(`listening to port ${port}`)})
        // startServer(app)
    })

    test('', async ()=>{
                
        const res = await request(app)
        .post(`http://localhost:5000/api/v2/auth/login`)
        .send({
          email: "johndoe@gmail.com",
          password: "password"
        });

        expect(res.statusCode).toBe(200);
    })

    afterAll(async ()=> {
        // await stopServer()
        mongod.stop()
    })
})