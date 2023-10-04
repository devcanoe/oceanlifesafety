import Base from "./base.model";

export interface User extends Base {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    phone?: number;
    address?: string;
    date_of_birth?: Date;
    position?: string;
    date_hired?: Date;
    date_fired?: Date;
    role?: string;
}