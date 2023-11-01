import { injectable } from "tsyringe";
import UserRepository from "../../common/database/repository/user.repository";

@injectable()
export default class UpdateUserService {
    constructor(
        private userRepository: UserRepository
    ){

    }

    async execute(userId: string, body: any){
        return await this.userRepository.updateData({_id: userId}, body);
    }
}