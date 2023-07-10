import mongoose, { Schema } from 'mongoose';
import Ship from '../models/ship.model';
import Invoice from '../models/invoice.model';

const invoiceItems: Schema = new Schema({
    description: { type: String },
    quantity: { type: Number },
    price: {type: Number}
});

const invoiceSchema: Schema = new Schema<Invoice>({
  ref_no: {
    type: String,
    required: true
  },
  items: [invoiceItems],
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

export default mongoose.model<Invoice>('Invoice', invoiceSchema)