import mongoose from "mongoose";

const AdminSchema=new mongoose.Schema({
    Username: { 
        type: String,  
    },
    password: { 
        type: String,  
    },
    totalUser: {
        type: Number,
        default: 0,
    },
    userId: {
        type: String,
    },
    orderId: {
        type: String,
    },
    userDetails: {
        type: [String],
    },
    fromGoogle: {
        type: Boolean,
        default: false,
    },
},{timestamps:true});


export default mongoose.model("Admin",AdminSchema);