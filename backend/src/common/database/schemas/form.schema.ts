import mongoose, { Schema } from 'mongoose';
import Form from '../models/form.model';
import { formColumnSchema } from './form_column.schema';

const formSchema: Schema = new Schema<Form>({
  company: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Company',
      required: true
  },
  ship: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Ship',
    required: true
  },
  location_of_vessel: {
    type: String
  },
  service_date: {
    type: Date
  },
  flag_state: {
    type: String
  },
  last_service_date: {
    type: Date
  },
  type: {
    type: String,
    enum: ["EEBD", "BACL"],
    required: true
  },
  specifications: [formColumnSchema],
  created_at: {
      type: Date,
      default: function() {
          return Date.now()
      }
  },
  updated_at: {
      type: Date,
      default: function() {
          return Date.now()
      }
  }
})

export default mongoose.model<Form>('Form', formSchema)