import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const orderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: null,
    },
    zipcode: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    totalItems: {
        type: Number,
    
    },
    totalPayment: {
        type: Number,
        required: true,
    },
    statuss: {
        type: String,
       required: true,
    },
    cartItems: [
        {
            name: {
                type: String,
                default: null,
            },
            price: {
                type: Number,
                default: null,
            },
            quantity: {
                type: Number,
                default: null,
            },
            image: {
                type: String,
                default: null,
            },
        },
    ],
    status: {
        type: Number,
        default: 1
    },
    createAT: {
        type: Date,
        default: Date.now()
    },

});


export default mongoose.model('Order', orderSchema);


