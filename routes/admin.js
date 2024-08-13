import express  from 'express';
import { deleteOrder, deleteUser, getAllOrders, getAllUsers } from '../controllers/admin.js';

const router=express.Router()

// Route to get all user details
router.get('/users', getAllUsers);

// Route to delete a user
router.delete('/users/:id', deleteUser);

// Route to get all orders
router.get('/orders', getAllOrders);

// Route to delete an order
router.delete('/orders/:id', deleteOrder);


export default router;