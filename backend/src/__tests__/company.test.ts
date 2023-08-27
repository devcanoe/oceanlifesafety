import "reflect-metadata"
import express, { Application } from "express";
import request from "supertest";
import { MongoMemoryServer } from 'mongodb-memory-server';
import { startServer, stopServer } from "../common/config/server.config";
import mongoose from "mongoose";
import UserRepository from "../common/database/repository/user.repository";
import app from "../app";
import LoginService from "../auth/services/login.service";
import { container } from "tsyringe";

describe('', () => {
    let mongod: any;
    let userRepository: UserRepository;
    let loginService: LoginService;

    beforeAll(async ()=> {
        // mongod = await MongoMemoryServer.create();
        // const uri = mongod.getUri();
        // mongoose.set('strictQuery', false);
        // await mongoose.connect(`${uri}`,{dbName: 'testDB'}).then((res: any)=> {
        //     console.log("Database connected successfully")
        // }).catch((err: any)=>{
        //     console.log("Seems an error occurred while connecting to mongo")
        // });

        // const port = 5000

        // app.listen(port)
     
    })

    test('', async ()=>{  
       
        // const auth = await loginService.execute(req, res);

        // const res = await request(app)
        // .post(`/api/v2/company/create`)
        // .set('authorization', `Bearer `)
        // .send({
        //   name: "shell"
        // });

        // expect(res.statusCode).toBe(200);
    })

    afterAll(async ()=> {
        // await stopServer()
        // app.on('end', () => {
        //     console.log('disconnect')
        // });
        // mongod.stop()
    })
})