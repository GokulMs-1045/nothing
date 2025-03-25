import express from "express";
import { createOrderbyId, getOrdersById } from "../controllers/order/order.js";


const router = express.Router();

// Single route for creating an order
router.post('/:googleId/:productName/order', createOrderbyId);
router.get('/order/:googleId/:productName?', getOrdersById);

export default router;