import { injectable } from "tsyringe";
import UserRepository from "../../common/database/repository/user.repository";

@injectable()
export default class DeleteUserService {
    constructor(
        private userRepository: UserRepository
    ){

    }

    async execute(id: string){
        return await this.userRepository.deleteData(id);
    }
}