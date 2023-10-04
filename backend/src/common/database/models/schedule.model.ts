import Base from "./base.model";

export interface Schedule extends Base {
    description?: string;
    due_date?: string;
    author?: string;
}