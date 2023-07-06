import bcrypt from 'bcryptjs';
import { injectable } from 'tsyringe';

@injectable()
export default class Encryption {
  constructor(){}

  async hash(text: string){
    const SALT_AMOUNT = 10;
    const salt = await bcrypt.genSalt(SALT_AMOUNT);
    
     return bcrypt.hash(
        text, 
        salt
    );
  }
    
  async compareHash(password: string, dbpassword: string){
      if(await bcrypt.compare(password, dbpassword)){
        return true
      }
      return false
  }
}