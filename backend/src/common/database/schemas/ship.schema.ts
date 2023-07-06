import mongoose, { Schema } from 'mongoose';
import Ship from '../models/ship.model';

const shipschema: Schema = new Schema<Ship>({
  name: {
    type: String,
    required: true
  },
  company: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Company',
      required: true
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

export default mongoose.model<Ship>('Ship', shipschema)