import Base from "./base.model";

export default interface Ticket extends Base {
  subject?: string;
  type?: string;
  customer?: string;
  agent?: string;
  description?: string;
  priority?: string;
}
