import Base from "./base.model";

export interface Invoice extends Base {
  ref_no?: string;
  items?: any[];
}
