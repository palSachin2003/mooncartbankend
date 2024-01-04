
import mongoose from 'mongoose';

const Schema = mongoose.Schema

const CategoryModel = new Schema({

    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        default:null
    },
    description: {
        type: String,
        require: true
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

export default mongoose.model('Category', CategoryModel)