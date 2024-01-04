import express from 'express'
import { addInstaxUser, getInstaxUser, getInstaxUsers, login, register, updateInstaxUser, userInstaxDelete, userInstaxSoftDelete } from '../Controller/instaxUser.controller';
const router = express.Router();

router.get('/get-Instaxusers',getInstaxUsers);
router.get('/get-Instaxuser/:user_id',getInstaxUser);
router.post('/add-Instaxuser',addInstaxUser);
router.delete("/delete-Instaxuser/:user_id",userInstaxDelete)
router.delete("/Instaxsoftdelete/:user_id",userInstaxSoftDelete)
router.put('/update-Instaxuser/:user_id',updateInstaxUser)


// ===============singUp/singIN====================

router.post('/log-in',login)
router.post('/register',register)

export default router;
