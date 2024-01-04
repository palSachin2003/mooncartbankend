import express from 'express';
import Cors from 'cors'
import userRouter from './Router/user.router'
import category from './Router/category.router'
import cart from './Router/cart.router'
import product from './Router/project.router'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import order from './Router/order.router'






const app = express();
app.use(express.json())
app.use(express.static(__dirname))
const PORT = 8001
app.use(Cors());
dotenv.config();


app.listen(PORT, () => {
    console.log('server is running on ' + PORT)
});

const connectToDatabase = async () => {
    try {
        await mongoose.connect("mongodb+srv://palshachin:mooncart@cluster0.4uaoew9.mongodb.net/Mooncart?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas')
    }
    catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);

    }
}
connectToDatabase();



app.use(userRouter)
app.use(category)
app.use(cart)
app.use(product)
app.use(order)



