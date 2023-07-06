import { Schema } from 'mongoose';
import FormColumn from '../models/form_columns.model';

export const formColumnSchema: Schema = new Schema<FormColumn>({
  serial_no: {
    type: String
  },
  make: {
    type: String
  },
  location: {
    type: String
  },
  date_hyd_tested: {
    type: Date
  },
  cylinder_condition: {
    type: String
  },
  testing_bar: {
    type: String
  },
  refiling_bar: {
    type: String
  },
  remark: {
    type: String
  },
});