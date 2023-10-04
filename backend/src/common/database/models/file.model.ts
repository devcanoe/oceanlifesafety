import Base from "./base.model";

export interface File extends Base {
    name?: string;
    author?: string;
    size?: string;
    type?: string;
    folder?: string;
    starred?: boolean;
}