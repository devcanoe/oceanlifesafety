import Base from "@/common/model/base.model";

export default interface User extends Base {
    firstname?: string;
    lastname?: string;
    address?: string;
    email?: string;
    phone?: number;
    password?: string;
    position?: string;
    date_of_birth?: Date;
    date_hired?: Date;
    date_fired?: Date;
}