import { createError } from "../error.js"
import User from "../models/User.js"
import Order from "../models/Order.js";
import Feedback from "../models/Feedback.js";


//ADMIN PARTS CONTROLLS
export const update=async (req,res,next)=>{
    // // console.log(req.user.id);
    // console.log(req.admin.id);
    // console.log(req.params.id);
    if(req.params.id === req.admin.id){
        try {
            const updatedUser=await User.findByIdAndUpdate(
                req.params.id,{
                    $set:req.body,
                },
                {new:true}
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error)
        }
    }else{
        return next(createError(403,"You can update only your accounts!"))
    }
}

export const deleted=async (req,res,next)=>{
    
    if(req.params.id === req.admin.id){
        try {
            const DeletedUser=await User.findByIdAndDelete(
                req.params.id,
            );
            res.status(200).json("user has been deleted");
        } catch (error) {
            next(error)
        }
    }else{
        return next(createError(403,"You can Delete only your accounts!"))
    }
}

export const getUser=async (req,res,next)=>{
    try {
        const user=await User.findById(req.params.id)
        res.status(200).json(user)    
    } catch (error) {
        next(error)
    }
}

//GET ALL PRODUCT USING USER PARTS USING THIS WAYS
export const getProduct=async (req,res,next)=>{
  try {
      const Cart=await Order.findById(req.params.id)
      res.status(200).json(Cart)     
  } catch (error) {
      next(error)
  }
}

//get cart
export const sub1 = async (req, res, next) => {
  try {
    const user=await User.findById(req.params.id)
    const subscribedChannels = user.subscribedUsers;
    console.log(user);
    const order=await Order.findById(req.params.id)
    console.log(order);
    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Order.find({ userId: channelId });
      })
    );
  console.log(list);
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

//addToCardValues
export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.")
  } catch (err) {
    next(err);
  }
};



export const unsubscribe = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscription successfull.")
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};




//remember you have to target multiple order so i think it may be ::...req.params.id
//when user Cancle the Total Order
export const cancleOrder=async (req,res,next)=>{
    try {
        try {
          await User.findByIdAndUpdate(req.user.id, {
            $pull: { addtocart: req.params.id },
          });
          await User.findByIdAndUpdate(req.params.id, {
            $inc: { addtocartval: -1 },
          });
          res.status(200).json("Unsubscription successfull.")
        } catch (err) {
          next(err);
        }
      } catch (err) {
        next(err);
      }
}

export const randomUser = async (req, res, next) => {
  try {
      const user = await User.aggregate([{ $sample: { size: 60 } }]);
      
      res.status(200).json(user);
      
  } catch (err) {
      next(err);
  }
};


 //feedback pending
 export const feedback= async (req,res,next)=>{
  
  try {
      const newUser = new Feedback({ ...req.body });
      
      await newUser.save();
      res.status(200).send("Feedback has been submitted!");
  } catch (error) {
      next(error)
  }
};


import bcrypt from "bcryptjs"
//update the password
export const updatePassword = async (req, res, next) => {
  try {
      const { email, newPassword, confirmPassword } = req.body;

      // Validate if newPassword and confirmPassword match
      if (newPassword !== confirmPassword) {
          return res.status(400).json({ message: "Passwords do not match" });
      }

      // Find the user by email
      const user = await User.findOne({ email });

      // If user not found, return error
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      // Return success message
      res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ message: "Internal server error" });
  }
};