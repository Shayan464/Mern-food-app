// routes/orderRoute.js
import express from "express";
import { placeOrder } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

// ✅ Order placing route
orderRouter.post("/place", authMiddleware, placeOrder);

export default orderRouter;
