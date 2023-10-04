import Base from "./base.model";

export default interface Calendar extends Base {
    type?: string;
    description?: string; // for task type 
    title?: string; // for task type
    due_date?: string;
    due_time?: string; // for task
    company?: string;
    vessel?: string;
    status?: boolean
}