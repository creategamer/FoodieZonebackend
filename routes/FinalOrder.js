// routes.js

import express from "express";
import { UserconfirmOrder, cancelOrder,  confirmOrder, createFinalOrder, deleteFinalOrder, getAllFinalOrders, getCurrentUserCancelledOrders, getCurrentUserOrder, getCurrentUserPendingOrders, getFinalOrderById, markOrderAsPending, updateFinalOrderStatus } from "../controllers/FinalOrder.js";
// import {
//   createFinalOrder,
//   getAllFinalOrders,
//   getFinalOrderById,
//   updateFinalOrderStatus,
//   deleteFinalOrder,
// } from "./controllers/finalOrderController.js";



const router = express.Router();

router.post("/final-orders", createFinalOrder);
router.get("/final-orders", getAllFinalOrders);
router.get("/final-orders/:id", getFinalOrderById);
router.put("/final-orders/:id", updateFinalOrderStatus);
router.delete("/final-orders/:id", deleteFinalOrder);

router.put('/orders/:orderId/confirm', confirmOrder);
router.put('/orders/:orderId/pending', markOrderAsPending);
router.put('/orders/:orderId/cancel', cancelOrder);

//user
// Route to confirm an order
router.get('/users/:userId/orders/confirmed', getCurrentUserOrder);
router.get('/users/orders/pending/:userId', getCurrentUserPendingOrders);
router.get('/users/orders/cancelled/:userId', getCurrentUserCancelledOrders);


export default router;
