import jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';

@injectable()
export default class Token {
  generate(payload: any, secret: string){
    const token = jwt.sign(payload, secret)
    return token;
  }
  
  async verify(payload: any, secret: string){
    return jwt.verify(payload, secret);
  }
}
