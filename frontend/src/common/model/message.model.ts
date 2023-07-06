import Base from "./base.model";

export default interface Message extends Base {
    to?: string;
    from?: string;
    ticket?: string;
    message?: string;
}