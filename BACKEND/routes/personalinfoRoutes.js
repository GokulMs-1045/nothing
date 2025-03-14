import express from "express";
import personalinfoController from '../controllers/personalinfo/personalinfo.js';

const router = express.Router();

// POST route to save customer/dealer based on userType
router.post("/per-info", personalinfoController.saveUserInfo);

export default router;
