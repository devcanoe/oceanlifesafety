import mongoose from 'mongoose';
import { singleton } from 'tsyringe';

const DB_URL = process.env.MONGODB_URI;

@singleton()
export default class DatabaseHelper {

  constructor(){}

  async connect() {
      mongoose.set('strictQuery', false);
      await mongoose.connect(`${DB_URL}`).then((res: any)=> {
        console.log("Database connected successfully")
      }).catch((err: any)=>{
        console.log("Seems an error occurred while connecting to mongo")
      })
  }

  async disconnect(){
      await mongoose.disconnect().then((res: any)=> {
        console.log("Database disconnected")
      }).catch((err: any)=> {
        console.log(err.message)
      });
  }

  createData(model: any, data: any) {
    try{
      return model.create(data);
    }catch(err){
      return err
    }
  }

  readData(model: any, data: any, select?: any){
    try{
      return model.find(data, select)
    }catch(err: any){
      return err.message;
    }
  }

  readSingleData(model: any, data: any, select?: any){
    try{
      return model.findOne(data, select)
    }catch(err: any){
      return err.message;
    }
  }

  updateData(model: any, keyword: any, data: any){
    try{
      return model.findOneAndUpdate(keyword, data)
    }catch(err: any){
      return err.message
    }
  }

  deleteData(model: any, keyword: any){
    try{
      return model.findByIdAndRemove(keyword)
    }catch(err: any){
        return err.message
    }
  }
}
