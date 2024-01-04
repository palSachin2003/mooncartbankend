import mongoose from 'mongoose';
import categoryModel from './category.model'

const Schema = mongoose.Schema

const productModel = new Schema({

    name: {
        type: String,
        require: true
    },
    categoryID: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: categoryModel
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    images: {
        type: Array,
        default: null
    },
    stock: {
        type: Number,
        default: 12
    },
    shortDescription: {
        type: String,
        default: null
    },
    description: {
        type: String,
        require: true
    },
    sku: {
        type: String,
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

export default mongoose.model('Product', productModel)


// name
//     - userID
//     - categoryID
//     - subcategoryID
//     - price
//     - quantity
//     - thumbnail
//     - images
//     - stock
//     - shortDescription
//     - description