export interface Task {
    type?: string;
    description?: string;
    title?: string;
    due_time?: string;
    due_date?: string;
    status?: boolean;
}

export interface Service {
    type?: string;
    due_date?: string;
    company?: string;
    vessel?: string;
    status?: boolean
}