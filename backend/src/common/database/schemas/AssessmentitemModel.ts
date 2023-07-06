import mongoose, { Schema } from 'mongoose';

const assessmentitemschema: Schema = new Schema({
  item: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Item'
  },
  assessment: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Assessment'
  },
  quality: {
      type: Number,
  },
  man_date: {
      type: Date
  },
  expiry_date: {
      type: Date
  },
  remarks: {
      type: String
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

export default mongoose.model('Assessmentitem', assessmentitemschema)