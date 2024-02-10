import mongoose from 'mongoose';
import instaxModel from './instax.model';
const Schema = mongoose.Schema

const instaxItemModel = new Schema({

    title: {
        type: String,
        require: true
    },
    tag: {
        type: String,
        require: true
    },
    categoryID: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: instaxModel
    },
    price: {
        type: Number,
        require: true
    },
    discount: {
        type: Number,
        require: true
    },
    images: {
        type: Array,
        default: null
    },
    color: {
        type: String,
        require: true
    },
    disTitle: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    shortdisTitle: {
        type: String,
        default: null
    },
    shortdescription: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 1
    },
    createAT: {
        type: Date,
        default: Date.now()
    },
})

export default mongoose.model('item', instaxItemModel)
