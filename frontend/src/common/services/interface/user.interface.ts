import Base from "@/common/model/base.model";

export default interface User extends Base {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: number
}