import express from 'express';
import cors from 'cors';
import userRouter from './Router/user.router';
import categoryRouter from './Router/category.router';
import cartRouter from './Router/cart.router'; 
import productRouter from './Router/project.router'; 
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import orderRouter from './Router/order.router';

const app = express();
const PORT = 8001;

const corsOptions = {
  // origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(__dirname));

dotenv.config();

app.listen(PORT, () => {
  console.log('Server is running on ' + PORT);
});

const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://palshachin:sachin123@cluster0.4uaoew9.mongodb.net/Mooncart?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};

connectToDatabase();

app.use(userRouter);
app.use(categoryRouter);
app.use(cartRouter); 
app.use(productRouter); 
app.use(orderRouter);
