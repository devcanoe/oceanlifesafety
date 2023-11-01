import { injectable } from "tsyringe";
import UserRepository from "../../common/database/repository/user.repository";

@injectable()
export default class GetUserService {
    constructor(
        private userRepository: UserRepository
    ){

    }

    async execute(userId: string){
        return await this.userRepository.fetchOneData({_id: userId});
    }
}