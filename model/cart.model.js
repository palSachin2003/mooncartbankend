
import mongoose from 'mongoose';
import userModel from './user.model';
import productModel from './productModel';

const Schema = mongoose.Schema

const cartModel = new Schema({

    name: {
        type: String,
        require: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: userModel
    },

    productID: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: productModel
    },
    image: {
        type: String,
        default: null
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
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

export default mongoose.model('Carts', cartModel)