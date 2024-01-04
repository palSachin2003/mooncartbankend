import express from 'express'
import {addProduct, deleteProduct, getProduct, getProducts, softDeleteProduct, updateProduct} from '../Controller/product.controller'



const router = express.Router()

router.get('/get-Products',getProducts)
router.get('/get-Product/:product_id',getProduct)
router.post('/add-product',addProduct)
router.put('/update-Product/:product_id',updateProduct)
router.delete('/delete-Product/:product_id',deleteProduct)
router.delete('/soft-delete-Product/:product_id',softDeleteProduct)


export default router