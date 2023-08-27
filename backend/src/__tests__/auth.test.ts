import "reflect-metadata"
import express, { Application } from "express";
import request from "supertest";
import { MongoMemoryServer } from 'mongodb-memory-server';
import { startServer, stopServer } from "../common/config/server.config";
import mongoose from "mongoose";
import UserRepository from "../common/database/repository/user.repository";
import app from "../app";
import { container } from "tsyringe";
import Encryption from "../common/helper/encrypt.helper";

describe('', () => {
    let mongod: any;
    let userRepository: UserRepository;
    let encryptionHelper: Encryption;

    beforeAll(async ()=> {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        mongoose.set('strictQuery', false);
        await mongoose.connect(`${uri}`,{dbName: 'testDB'}).then((res: any)=> {
            console.log("Database connected successfully")
        }).catch((err: any)=>{
            console.log("Seems an error occurred while connecting to mongo")
        });

        userRepository = container.resolve(UserRepository);
        encryptionHelper = container.resolve(Encryption)

        const port = 5000

        app.listen(port)
        // startServer(app)
    })

    test('', async ()=>{  

        const hashedPassword = await encryptionHelper.hash("password");
        
        const user = await userRepository.addData({
            firstname: "john",
            lastname: "doe",
            phone: 2347016181313,
            email: "johndoe@gmail.com",
            password: hashedPassword
        });
        console.log(user)
        const res = await request(app)
        .post(`/api/v2/auth/login`)
        .send({
          email: "johndoe@gmail.com",
          password: "password"
        });
        console.log(res.body)
        // expect(res.statusCode).toBe(200);
    })

    afterAll(async ()=> {
        // await stopServer()
        mongod.stop()
    })
})