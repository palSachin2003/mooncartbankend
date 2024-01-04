
import express from 'express'
import {addUser,genotp, getUser, getUsers, singIn, singUp, updateUser, userDelete, userSoftDelete, verifyOtp} from '../Controller/user.controller'
const router = express.Router();

router.get('/get-users',getUsers);
router.get('/get-user/:user_id',getUser);
router.post('/add-user',addUser);
router.delete("/delete-user/:user_id",userDelete)
router.delete("/softdelete/:user_id",userSoftDelete)
router.put('/update-user/:user_id',updateUser)


// ===============singUp/singIN====================

router.post('/sign-in',singIn)
router.post('/sign-up',singUp)

router.post('/signup-otp',genotp)
router.post('/vrf-otp',verifyOtp)

export default router;
