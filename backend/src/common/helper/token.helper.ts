import jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';

const SECRET_KEY = process.env.SECRET_KEY || "";

@injectable()
export default class Token {
  generate(payload: any, secret?: string){
    const token = jwt.sign(payload, SECRET_KEY)
    return token;
  }
  
  async verify(payload: any, secret?: string){
    const response = await jwt.verify(payload, SECRET_KEY);
    console.log('jwt: ' + response);
    return response;
  }
}
