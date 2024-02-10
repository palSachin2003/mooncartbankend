import express from 'express';
import Cors from 'cors'
import userRouter from './Router/user.router'
import category from './Router/category.router'
import cart from './Router/cart.router'
import product from './Router/project.router'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import order from './Router/order.router'
import instaxCate from './Router/instax.router'; // instax category
import instaxProduct from './Router/instaxProject.router';
import instaxUser from './Router/instaxUser.router';
import instaxCart from './Router/instaxCart.router '
import instaxBuy from './Router/instaxBuy.router' 


 


const app = express();
app.use(express.json())
app.use(express.static(__dirname))
const PORT = 8001
app.use(Cors());
dotenv.config();


app.listen(PORT,()=>{
    console.log('server is running on '+PORT)
});

mongoose.connect('mongodb+srv://palshachin:mooncart@cluster0.4uaoew9.mongodb.net/')
.then(()=> console.log('BD Connected!'))
.catch(err=> console.log(err))

app.use(userRouter)

app.use(category)
app.use(cart)
app.use(product)
app.use(order)
app.use(instaxCate)
app.use(instaxProduct)
app.use(instaxUser)
app.use(instaxCart)
app.use(instaxBuy)


