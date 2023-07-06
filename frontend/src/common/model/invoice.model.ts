import Base from "./base.model";

export interface Invoice extends Base {
  ticket?: string;
  service?: string;
  quantity?: number;
  amount?: number;
}
