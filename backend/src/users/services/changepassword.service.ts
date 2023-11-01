import { injectable } from "tsyringe";
import Encryption from "../../common/helper/encrypt.helper";
import UserRepository from "../../common/database/repository/user.repository";
import { BadRequestError } from "../../common/error/badrequest.error";

@injectable()
export default class ChangepasswordService {
    constructor(
        private userRepository: UserRepository,
        private encryptionHelper: Encryption,
    ){

    }

    async execute(userId: string, password: string, confirmpassword: string){

            if(password !== confirmpassword){
                throw new BadRequestError('Password doesnt match')
            }
    
            //encrypt password
            const hashedPassword = await this.encryptionHelper.hash(password)
        
            return await this.userRepository.updateData({_id: userId},{
                password: hashedPassword
            });

    }
}