import express  from 'express';
import {  adminSignin, adminsignup, signin, signup } from '../controllers/auth.js';

const router=express.Router()

//CREATE A USER
router.post("/signup",signup)

//SIGNING A USER
router.post("/signin",signin)

//Admin A user Signin
router.post("/adminsignup",adminsignup)

//Admin A user Signin
router.post("/adminsignin",adminSignin)


//GOOGLE AUTH APPLICATIONS
router.post("/google")



export default router;