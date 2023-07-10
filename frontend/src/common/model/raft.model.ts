import Base from "./base.model";

export default interface Raft extends Base {
    serial_no?: string;
    ship?: string;
    company?: string;
    capacity?: number;
    man_date?: Date;
    last_service_date?: Date;
    make?: string;
    type?: string;
    cert_no?: string;
}