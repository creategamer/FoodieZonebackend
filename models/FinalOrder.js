// finalOrderModel.js

import mongoose from "mongoose";

const FinalOrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user: {
    username: String,
    email: String,
    address: String,
    phoneNumber: String,
    pincode: String,
    city: String,
  },
  cartItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  }],
  totalPrice: {
    type: Number,
    required: true,
    
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.model("FinalOrder", FinalOrderSchema);
