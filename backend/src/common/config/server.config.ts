import { Application } from "express";
import DatabaseHelper from "../helper/database.helper";
import { container } from "tsyringe";

const dataBase = container.resolve(DatabaseHelper);

export const startServer = (app: Application) => {
    try{
        dataBase.connect();
    
        const port: string = process.env.PORT || "5000"
    
        app.listen(port, () => { console.log(`listening to port ${port}`)})
    
      }catch(error){
        console.log(error)
    }
}

export const stopServer = () => {
    dataBase.disconnect();
}