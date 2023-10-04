import Base from "./base.model";

export interface Folder extends Base {
    name?: string;
    parent?: string;
    author?: string;
    starred?: boolean;
}