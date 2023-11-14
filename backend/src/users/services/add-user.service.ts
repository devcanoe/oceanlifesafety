import { injectable } from "tsyringe";
import UserRepository from "../../common/database/repository/user.repository";
import Encryption from "../../common/helper/encrypt.helper";

export interface IAddUserInput {
    firstname?: string;
    lastname?: string;
    address?: string;
    email?: string;
    phone?: string;
    password?: string;
    position?: string;
    date_of_birth?: Date;
    date_hired?: Date;
    date_fired?: Date;
}

@injectable()
export default class AddUserService {
    constructor(
        private userRepository: UserRepository,
        private encryptionHelper: Encryption,
    ){

    }

    async execute(args: IAddUserInput) {

        const hashedPassword = await this.encryptionHelper.hash(args.password ? args.password : '');
    
        const response = await this.userRepository.addData({
            ...args,
            role: 'STAFF',
            phone: Number(args.phone),
            date_of_birth: new Date(args.date_of_birth ? args.date_of_birth : ''),
            date_hired: new Date(args.date_hired ? args.date_hired : ''),
            date_fired: new Date(args.date_fired ? args.date_fired : ''),
            password: hashedPassword
        });

        console.log('error ' + args);

        return response;
    }
}