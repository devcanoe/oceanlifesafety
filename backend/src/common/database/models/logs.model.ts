import Base from "./base.model";

export default interface Logs extends Base {
    description?: string;
    user?: string;
    ticket?: string;
}