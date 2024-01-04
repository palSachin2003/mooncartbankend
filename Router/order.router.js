import express from "express";
import { addOrder, getOrder } from "../Controller/order.controller";

const router = express.Router();

router.get('/get-order',getOrder)
router.post('/add-order',addOrder)



export default router