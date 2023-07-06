import mongoose, { Schema } from 'mongoose'

const assessmentschema: Schema = new Schema({
  service_date: {
    type: Date,
    required: true
  },
  raft: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Raft'
  },
  client_rep: {
    type: String
  },
  service_agent: {
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

export default mongoose.model('Assessment', assessmentschema)