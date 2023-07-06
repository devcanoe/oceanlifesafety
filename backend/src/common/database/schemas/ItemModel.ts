import mongoose, { Schema } from 'mongoose'

const itemschema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  service: {
      type: String,
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

export default mongoose.model('Item', itemschema)