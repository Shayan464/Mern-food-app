import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

const placeOrder = async (req, res) => {
  const userId = req.userId;
  const { items, amount, address } = req.body;

  const frontend_url = 'http://localhost:5173';

  try {
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      status: 'Order Placed',
      paymentId: 'COD', // optional placeholder
    });

    await newOrder.save();

    // clear cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: newOrder,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order' });
  }
};

//user orders for frontend

const userorders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: 'Error in userOrders',
    });
  }
};

// list all orders for admin panel

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error in list orders' });
  }
};

// api for updating order status

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    console.log(error, 'Error in updating status');
    res.json({ success: false, message: 'Error' });
  }
};

export { placeOrder, userorders, listOrders, updateStatus };
