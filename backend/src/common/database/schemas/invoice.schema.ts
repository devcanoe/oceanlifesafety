import mongoose, { Schema } from 'mongoose';
import Invoice from '../models/invoice.model';

const invoiceItems: Schema = new Schema({
    description: { type: String },
    quantity: { type: Number },
    price: {type: Number},
    total: {type: Number}
});

const invoiceSchema: Schema = new Schema<Invoice>({
  ref_no: {
    type: String,
    required: true
  },
  receiver_name: {
    type: String,
    required: true
  },
  receiver_company: {
    type: String,
    required: true
  },
  receiver_address: {
    type: String,
    required: true
  },
  sender_name: {
    type: String,
    required: true
  },
  sender_company: {
    type: String,
    required: true
  },
  sender_address: {
    type: String,
    required: true
  },
  invoice_date: {
    type: Date,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  terms: {
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