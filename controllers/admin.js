import Order from "../models/Order.js";
import User from "../models/User.js";

// Get all user details
export const getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  // Delete a user
export const deleteUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return next(createError(404, "User not found"));
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  //get all product
  // Get all orders
export const getAllOrders = async (req, res, next) => {
    try {
      const orders = await Order.find({});
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  // Delete an order
export const deleteOrder = async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const deletedOrder = await Order.findByIdAndDelete(orderId);
      if (!deletedOrder) {
        return next(createError(404, "Order not found"));
      }
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      next(error);
    }
  };