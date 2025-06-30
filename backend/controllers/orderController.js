import orderModel from './../models/orderModel.js';
import userModel from './../models/userModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = 'https://food-app-frontend-jzem.onrender.com'; // Change in production

// Place Order
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: 'INR',
        product_data: { name: item.name },
        unit_amount: item.price * 100, // Stripe expects paise
      },
      quantity: item.quantity,
    }));

    // Add Delivery Charge
    line_items.push({
      price_data: {
        currency: 'INR',
        product_data: { name: 'Delivery Charges' },
        unit_amount: 2000, // ₹20
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Order placement failed' });
  }
};

// Verify Order
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: 'Payment successful' });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: 'Payment failed' });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Verification failed' });
  }
};

// Get User Orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Fetching user orders failed' });
  }
};

// Admin - List All Orders
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Fetching all orders failed' });
  }
};

// Admin - Update Status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Status update failed' });
  }
};

export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
};
