import express from "express";
import { createOrderbyId } from "../controllers/order/order.js";

const router = express.Router();

// Single route for creating an order
router.post('/:googleId/:productName/order', createOrderbyId);

export default router;