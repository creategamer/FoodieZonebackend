import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouters from "./routes/users.js";
import adminRouters from "./routes/admin.js";
import orderRouters from "./routes/orders.js";
import authRouters from "./routes/auth.js";
import FinalOrderRouters from "./routes/FinalOrder.js"
import cookieParser from "cookie-parser";

const app = express()
dotenv.config()

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("connectd to DB ");
    }).catch((err) => {
        throw err;
    });
}

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRouters)
app.use("/api/users", userRouters)
app.use("/api/admin/", adminRouters)
app.use("/api/order", orderRouters)
app.use("/api/Finalorder", FinalOrderRouters)

// app.use("/api/order",authRouters)

// app.use((err,req,res,next)=>{
//     const status=err.status || 500;
//     const message=err.message || "something went wrong!";
//     return res.status(status).json({
//         success:false,
//         status,
//         message,
//     })
// })

// Error Handling Middleware
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);  // Pass the error to the default Express error handler if headers are already sent
    }
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.listen(8200, () => {
    connect();
    console.log("Connected to servers!");
})