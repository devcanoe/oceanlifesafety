import mongoose, { Schema } from 'mongoose';
import Company from '../models/company.model';

const companySchema: Schema =  new Schema<Company>({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
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

export default mongoose.model<Company>('Company', companySchema)