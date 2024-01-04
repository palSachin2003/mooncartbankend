import express from 'express'
import { addCategory, deleteCategory, deleteSoftCategory, getCategory, getCategorys, updateCategory } from '../Controller/category.controller'
const router = express.Router();

router.get('/get-categorys',getCategorys)
router.get('/get-category/:cate_id',getCategory)
router.post('/add-category',addCategory)
router.put('/update-category/:cate_id',updateCategory)
router.delete('/delete-category/:cate_id',deleteCategory)
router.delete('/delete-soft-category/:cate_id',deleteSoftCategory)


export default router