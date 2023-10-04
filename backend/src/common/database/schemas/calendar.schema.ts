import { Schema, model } from "mongoose";
import Calendar from "../models/calender.model";

const calendarSchema: Schema = new Schema<Calendar>({
    type: {
        type: String,
        enum: ["TASK", "SERVICING"],
        required: true
    },
    description: {
        type: String
    },
    title: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    due_date: {
        type: String
    },
    company: {
        type: String
    },
    vessel: {
        type: String
    },
    due_time: {
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
});

export default model('Calendar', calendarSchema);