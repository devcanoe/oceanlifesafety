import mongoose, { Schema } from 'mongoose';

const assessmentlogschema: Schema =   new Schema({
  assessment: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Assessment'
  },
  item: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Item'
  },
  quantity: {
      type: Number
  },
  expiry_date: {
      type: Date
  },
  status: {
      type: Boolean
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

export default mongoose.model('Assessmentlog', assessmentlogschema)