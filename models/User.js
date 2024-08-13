import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    Username:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true, 
    },
    address:{
        type:String,
        required:true,
    },
    phonenumber:{
        type:String,
        required:true,
    },
    pincode:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    admin: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin' 
    }, 
    //Order values Total
    subscribers: {
        type: Number,
        default: 0,
      },
      subscribedUsers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
        default: []
      },
    
},
{timestamps:true}
);


export default mongoose.model("User",UserSchema);