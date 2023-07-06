import mongoose, { Schema } from 'mongoose';

const fileSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["PO", "WAYBILL", "CERTIFICATE"]
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