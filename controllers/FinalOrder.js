// finalOrderController.js
// Create a new final order
import FinalOrder from "../models/FinalOrder.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const createFinalOrder = async (req, res) => {
  try {
    const { userId, cartItems, totalPrice } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const finalOrder = await FinalOrder.create({ 
      userId, 
      user: {
        name: user.name,
        email: user.email,
        address: user.address,
        phoneNumber: user.phonenumber,
        pincode: user.pincode,
        city: user.city,
      },
      cartItems, 
      totalPrice 
    });
    res.status(201).json(finalOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create final order", error: error.message });
  }
};

//create a order
// export const createFinalOrder = async (req, res) => {
//   try {
//     const { userId, cartItems, totalPrice } = req.body;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Fetch details of each cart item
//     const cartItemsDetails = await Order.find({ _id: { $in: cartItems } });
    
//     // Map the cart items to include complete details
//     const mappedCartItems = cartItemsDetails.map((item) => ({
//       name: item.name,
//       price: item.price,
//       quantity: item.quantity,
//       totalPrice: item.totalPrice
//     }));

    // Create final order
    // const finalOrder = await FinalOrder.create({ 
    //   userId, 
    //   user: {
    //     name: user.name,
    //     email: user.email,
    //     address: user.address,
    //     phoneNumber: user.phonenumber,
    //     pincode: user.pincode,
    //     city: user.city,
    //   },
    //   cartItems: mappedCartItems, 
    //   totalPrice,
    // });

//     res.status(201).json(finalOrder);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create final order", error: error.message });
//   }
// };

// Get all final orders
export const getAllFinalOrders = async (req, res) => {
    try {
      const finalOrders = await FinalOrder.find();
      res.status(200).json(finalOrders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch final orders", error: error.message });
    }
  };
  
  // Get final order by ID
  export const getFinalOrderById = async (req, res) => {
    try {
      const { id } = req.params;
      const finalOrder = await FinalOrder.findById(id);
      if (!finalOrder) {
        return res.status(404).json({ message: "Final order not found" });
      }
      res.status(200).json(finalOrder);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch final order", error: error.message });
    }
  };
  
  // Update final order status
  export const updateFinalOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const finalOrder = await FinalOrder.findByIdAndUpdate(id, { status }, { new: true });
      if (!finalOrder) {
        return res.status(404).json({ message: "Final order not found" });
      }
      res.status(200).json(finalOrder);
    } catch (error) {
      res.status(500).json({ message: "Failed to update final order status", error: error.message });
    }
  };
  
  // Delete final order
  export const deleteFinalOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const finalOrder = await FinalOrder.findByIdAndDelete(id);
      if (!finalOrder) {
        return res.status(404).json({ message: "Final order not found" });
      }
      res.status(200).json({ message: "Final order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete final order", error: error.message });
    }
  };


  // controllers/orderController.js

// import FinalOrder from '../models/finalOrderModel';

// Confirm an order
export const confirmOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await FinalOrder.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.status = 'confirmed';
    await order.save();
    res.status(200).json({ message: 'Order confirmed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to confirm order', error: error.message });
  }
};

// Mark an order as pending
export const markOrderAsPending = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await FinalOrder.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.status = 'pending';
    await order.save();
    res.status(200).json({ message: 'Order marked as pending successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark order as pending', error: error.message });
  }
};

// Cancel an order
export const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await FinalOrder.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.status = 'cancelled';
    await order.save();
    res.status(200).json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel order', error: error.message });
  }
};


//user parts confirm cancel
// Confirm an order
export const UserconfirmOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await FinalOrder.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.status = 'confirmed';
    await order.save();
    
    // Send a notification or message to the user
    const message = 'Your order has been confirmed!';
    // You can use a messaging service like Twilio, email, or push notifications to send the message to the user.
    
    res.status(200).json({ message: 'Order confirmed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to confirm order', error: error.message });
  }
};

//check status
// Confirm an order
// Get current user's order status and data
export const getCurrentUserOrder = async (req, res) => {
  const { userId } = req.params;
  try {
    const order = await FinalOrder.findOne({ userId, status: 'confirmed' });
    if (!order) {
      return res.status(404).json({ message: 'Order not found or not confirmed yet' });
    }
    res.status(200).json({ message: 'Order found', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
};

// Get current user's pending orders
export const getCurrentUserPendingOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await FinalOrder.find({ userId, status: 'pending' });
    res.status(200).json({ message: 'Pending orders found', orders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pending orders', error: error.message });
  }
};

// Get current user's cancelled orders
export const getCurrentUserCancelledOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await FinalOrder.find({ userId, status: 'cancelled' });
    res.status(200).json({ message: 'Cancelled orders found', orders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cancelled orders', error: error.message });
  }
};