import mongoose from 'mongoose';
import "reflect-metadata";

require('dotenv').config();

const connect = async () => {
    mongoose.connect(`${process.env.MONGODB_URI}`).then((res: any) => {
      console.log("Database connected")
    }).catch((err: any)=> {
      console.log(err.message)
    })
}

const createData =  (model: any, data: any) => {

  try{

    return model.create(data);

  }catch(err){

    return err

  }

}

const readData = (model: any, data: any, select?: any) => {
  try{

    return model.find(data, select).sort({ created_at: -1 });

  }catch(err: any){

    return err.message;

  }
}

const readSingleData = (model: any, data: any, select?: any) => {
  try{

    return model.findOne(data, select)

  }catch(err: any){

    return err.message;

  }
}

const updateData = (model: any, keyword: any, data: any) => {
  try{

    return model.findOneAndUpdate(keyword, data)

  }catch(err: any){
    return err.message
  }
}

const updateManyData = (model: any, keyword: any, data: any) => {
  try{

    return model.updateMany(keyword, data)

  }catch(err: any){
    return err.message
  }
}

const deleteData = (model: any, keyword: any) => {
  try{

    return model.findByIdAndRemove(keyword)

  }catch(err: any){
    
      return err.message
    
  }
}

export {
  connect,
  createData,
  readData,
  readSingleData,
  updateData,
  updateManyData,
  deleteData
}