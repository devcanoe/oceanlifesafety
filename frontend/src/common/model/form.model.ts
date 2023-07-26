import Base from "./base.model";
import FormColumn from "./form_columns.model";
import Ship from "./ship.model";

export default interface Form extends Base {
  company?: string;
  ship?: string | Ship;
  location_of_vessel?: string;
  service_date?: Date;
  flag_state?: string;
  last_service_date?: Date;
  type?: string;
  specifications?: FormColumn[];
}
