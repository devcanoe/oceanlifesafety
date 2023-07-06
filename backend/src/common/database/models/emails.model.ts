import Base from "./base.model";

export default interface Emails extends Base {
    company?: string;
    user?: string;
    email?: string;
}