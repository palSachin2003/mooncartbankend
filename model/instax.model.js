

import mongoose from 'mongoose';

const Schema = mongoose.Schema

const InstaxModel = new Schema({

    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        default:null
    },
    status:{
        type: Number,
        default:1
    },
    createAT:{
        type: Date,
        default:Date.now()
    },

})

export default mongoose.model('Instax', InstaxModel)