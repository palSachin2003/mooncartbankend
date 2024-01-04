import express from 'express'
import { addInstaxCart, deleteCartItembyInstaxuser, getInstaxCart } from '../Controller/instaxcart.controller';
const router = express.Router();

router.get('/instaxcart/:user_id', getInstaxCart)
router.post('/addinstaxcart', addInstaxCart)
router.delete('/instaxcartdelete/:userId', deleteCartItembyInstaxuser)



export default router