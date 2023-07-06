import mongoose, { Schema } from 'mongoose';

const cylinderschema: Schema =  new Schema({
  serial_no: {
    type: String,
    required: true
  },
  raft: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Raft'
  },
  status: {
    type: Boolean,
    default: false
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

export default mongoose.model('Cylinder', cylinderschema)