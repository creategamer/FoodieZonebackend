import mongoose from "mongoose";

const OrderSchema=new mongoose.Schema({
    admin: { 
        type:String,
        // required:true, 
    },
    userId:{
        type:String,
    },
    
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    desc:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    quantity:{
        type:String,
    },
    totalPrice:{
        type:String,
    },
    type:{
        type:String,
        required:true,
    },
    likes: {
        type: [String],
        default: [],
    },
    dislikes: {
        type: [String],
        default: [],
    },
    
},{timestamps:true});


export default mongoose.model("Order",OrderSchema);