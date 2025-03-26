import express from "express";
import { createOrderbyId, getAllOrders } from "../controllers/order/order.js";


const router = express.Router();

// Single route for creating an order
router.post('/:googleId/:productName/order', createOrderbyId);
router.get('/order', getAllOrders);

export default router;