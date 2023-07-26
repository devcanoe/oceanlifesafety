import Base from "./base.model";
import Ship from "./ship.model";

export default interface Raft extends Base {
  serial_no?: string;
  ship?: string | Ship;
  company?: string;
  capacity?: number;
  man_date?: Date;
  last_service_date?: Date;
  make?: string;
  type?: string;
  cert_no?: string;
}
