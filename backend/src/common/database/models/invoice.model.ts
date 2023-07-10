import Base from "./base.model";

export default interface Invoice extends Base {
    ref_no?: string;
    items?: any[]
}