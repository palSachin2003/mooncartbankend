import express from 'express'
import { addInstax, deleteInstax, getInstax, getInstaxs, updateInstax } from '../Controller/category.Instax';
const router = express.Router();

router.get('/get-InstaxsCate',getInstaxs)
router.get('/get-InstaxCate/:user_id',getInstax)
router.post('/add-to-InstaxCate',addInstax);
router.put('/update-InstaxCate-quantity/:cate_id',updateInstax);
router.delete('/delete-InstaxCate-item/:cate_id',deleteInstax);



export default router