
import mongoose from 'mongoose';
import instaxUserserModel from './instaxUser.model';
import instaxProductModel from './instaxProduct.Model';

const Schema = mongoose.Schema

const instaxBuyModel = new Schema({

    title: {
        type: String,
        require: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: instaxUserserModel
    },

    productID: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: instaxProductModel
    },
    image: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    discount: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
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

export default mongoose.model('instaxbuy', instaxBuyModel)