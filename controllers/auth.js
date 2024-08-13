import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../error.js";
import Admin from "../models/Admin.js";
import  jwt  from "jsonwebtoken";
import Feedback from "../models/Feedback.js";


export const signup= async (req,res,next)=>{
    console.log(req.body);
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body,password: hash });
        
        await newUser.save();
        res.status(200).send("User has been created!");
    } catch (error) {
        
        next(error)
    }
};


export const signin= async (req,res,next)=>{
    
    try {
        const Genuser = await User.findOne({Username:req.body.Username})
        
        if(!Genuser)
        {
            return next(createError(404,"user not founds"))
        }
        const isCorrect=await bcrypt.compare(req.body.password,Genuser.password)
        
        if(!isCorrect){
            return next(createError(400,"password wrong not founds"))
        }

        const token=jwt.sign({id:Genuser._id},process.env.JWT)        
        const { password, ...others } = Genuser._doc;

        res
            .cookie("access_token",token,
            {
                httpOnly:true
            })
            .status(200)
            .json(others)

    } catch (error) {
        
        next(createError(404,"signin problems"))
        next(error)
    }

};


export const adminsignup= async (req,res,next)=>{
    console.log(req.body);
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newAdmin = new Admin({ ...req.body,password: hash });
        
        await newAdmin.save();
        res.status(200).send("admin has been created!");
    } catch (error) {
        next(error)
    }
};

export const adminSignin = async (req, res, next) => {
    try {
        const { Username } = req.body; // Extract username directly
        const admin = await Admin.findOne({ Username }); // Enhanced readability
        
        
        
        if (!admin) {
            return next(new createError("Admin not found!")); // Dedicated 404 error class
        }

        const token=jwt.sign({id:admin._id},process.env.JWT)        
        const { password, ...others } = admin._doc;

        res
            .cookie("access_token",token,
            {
                httpOnly:true
            })
            .status(200)
            .json(others)

    } catch (error) {
      next(error); // Pass the error to error-handling middleware
    }
  };
  

 
