import mongoose, { Schema } from 'mongoose';

const cylinderspecschema: Schema = new Schema({
    cylinder: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Cylinder'
    },
    hydro_date: {
        type: Date,
    },
    gasweightco2: {
        type: Number
    },
    gasweightn2: {
        type: Number
    },
    taraweightco2: {
        type: Number
    },
    taraweightn2: {
        type: Number
    },
    fullweightco2: {
        type: Number
    },
    fullweightn2: {
        type: Number
    },
    assessment: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Assessment'
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

export default mongoose.model('Cylinder', cylinderspecschema)