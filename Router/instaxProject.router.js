import express from 'express'
import { addInstaxItem, deleteInstaxItem, getInstaxItem, getInstaxItems, softDeleteInstaxItem, updateInstaxItem } from '../Controller/instaxProduct.controller'


const router = express.Router()

router.get('/get-Instaxs',getInstaxItems)
router.get('/get-Instax/:product_id',getInstaxItem)
router.post('/add-Instax',addInstaxItem)
router.put('/update-Instax/:Instax_id',updateInstaxItem)
router.delete('/delete-Instax/:Instax_id',deleteInstaxItem)
router.delete('/soft-delete-Instax/:Instax_id',softDeleteInstaxItem)


export default router