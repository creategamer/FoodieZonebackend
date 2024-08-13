import express  from 'express';
import {   cancleOrder, deleted, feedback, getProduct, getUser,  randomUser,  subscribe,  unsubscribe,  update, updatePassword } from '../controllers/user.js';
import { verifyAdminToken, verifyToken } from './../verifyToken.js';

const router=express.Router()



//ADMIN PART CONTROLLES
//update user
router.put("/:id",verifyAdminToken,update)

//delete user
router.delete("/:id",verifyAdminToken,deleted)

//get a user
router.get("/find/:id",verifyAdminToken,getUser)

//get PRODUCTS
router.get("/find/:id",verifyAdminToken,getProduct)


//cancleOrder
router.put("/calcelOrder/:id",verifyToken,cancleOrder)

//get All user
router.get("/randomuser", randomUser)


//subscribe a user
router.put("/sub/:id", verifyToken, subscribe);

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe);

//get feedback
router.post("/feedback",feedback)

// Route to update user password
router.post('/update-password', updatePassword);


export default router;