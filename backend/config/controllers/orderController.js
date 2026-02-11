import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import paypal from "@paypal/checkout-server-sdk";


const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);


const placeOrder = async (req, res) => {
  const userId = req.userId; 
  const { items, amount, address } = req.body;

  try {
   
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      status: "Pending",
    });
    await newOrder.save();

    
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

  
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount.toString(),
          },
        },
      ],
    });

    
    const order = await client.execute(request);

   
    newOrder.paymentId = order.result.id;
    await newOrder.save();

   
    const approveUrl = order.result.links.find(link => link.rel === "approve").href;

    res.status(201).json({
      orderID: order.result.id,
      approveUrl,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order" });
  }
};

export { placeOrder };
