import { injectable } from "tsyringe";
import UserRepository from "../../common/database/repository/user.repository";

@injectable()
export default class GetUsersService {
    constructor(
        private userRepository: UserRepository
    ){

    }

    async execute(){
        return await this.userRepository.fetchData({});
    }
}