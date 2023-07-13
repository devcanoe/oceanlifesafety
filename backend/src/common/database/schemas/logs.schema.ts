import mongoose, { Schema } from 'mongoose';
import Logs from '../models/logs.model';

const logsSchema: Schema =  new Schema<Logs>({
  description: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  ticket: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
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

export default mongoose.model<Logs>('Log', logsSchema)