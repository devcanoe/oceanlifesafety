import mongoose, {Schema} from 'mongoose'
import Raft from '../models/raft.model'

const raftSchema: Schema =   new Schema<Raft>({
  serial_no: {
      type: String,
      required: true
  },
  ship: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Ship',
      required: true
  },
  company: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Company',
    required: true
},
  capacity: {
      type: Number
  },
  man_date: {
      type: Date
  },
  last_service_date: {
      type: Date
  },
  make: {
      type: String
  },
  type: {
      type: String
  },
  cert_no: {
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

export default mongoose.model<Raft>('Raft', raftSchema)