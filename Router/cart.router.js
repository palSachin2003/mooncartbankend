import express from 'express'
import { addCart, deleteCartItem, deleteCartItembyuser, getCart, updateQuantity } from '../Controller/cart.controller'
const router = express.Router();

router.get('/get-cart/:user_id',getCart)
router.post('/add-to-cart',addCart);
router.put('/update-quantity/:cart_id',updateQuantity);
router.delete('/delete-cart-item/:cart_id',deleteCartItem);
router.delete('/delete-cart-item-userid/:userId',deleteCartItembyuser);



export default router