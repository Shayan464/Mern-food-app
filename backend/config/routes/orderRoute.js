// routes/orderRoute.js
import express from 'express';
import {
  listOrders,
  placeOrder,
  updateStatus,
  userorders,
} from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

// ✅ Order placing route
orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/userorders', authMiddleware, userorders);
orderRouter.get('/list', listOrders);
orderRouter.post('/status', updateStatus);

export default orderRouter;
