import mongoose, { Schema } from 'mongoose';
import { User } from '../models/user.model';

const userschema: Schema =   new Schema<User>({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  date_hired: {
    type: Date,
    required: true
  },
  date_fired: {
    type: Date
  },
  role: {
    type: String,
    enum: ["ADMING", "MODERATOR", "STAFF"]
  },
  password: {
    type: String,
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

export default mongoose.model('User', userschema)