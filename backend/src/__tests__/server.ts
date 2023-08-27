import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../app";

let mongod: any;

export const staticconnect = async () => {
    mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();

    mongoose.set('strictQuery', false);

    await mongoose.connect(`${uri}`,{dbName: 'testDB'}).then((res: any)=> {
        console.log("Database connected successfully")
    }).catch((err: any)=>{
        console.log("Seems an error occurred while connecting to mongo")
    });

    const port = 5000

    app.listen(port)
}

export const disconnect = async () => {
    

    mongod.stop();
}