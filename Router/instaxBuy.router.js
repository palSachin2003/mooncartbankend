import express from 'express'
import { addInstaxBuy, deleteBuyItembyInstaxuser, getInstaxBuy } from '../Controller/instaxBuy.controller';
const router = express.Router();

router.get('/instaxbuy/:user_id', getInstaxBuy)
router.post('/addinstaxbuy', addInstaxBuy)
router.delete('/instaxbuydelete/:userId', deleteBuyItembyInstaxuser)

export default router