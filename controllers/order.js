import Order from "../models/Order.js"
import User from "../models/User.js"
import { createError } from "../error.js"
import AsyncHandler from "express-async-handler";

//when admin add To cart click
export const AddProduct = async (req, res, next) => {
    // const newProduct = new Order({ userId: req.user.id, ...req.body });
    const newadminProduct = new Order({ adminId: req.admin.id, ...req.body });
    //console.log(req.admin.id);

    try {
        const savedCart = await newadminProduct.save()
        res.status(200).json(savedCart)
    } catch (error) {
        next(error)
    }
}

//Add user cart
export const addUserProduct = async (req, res, next) => {
    const newCart = new Order({ userId: req.user.id, ...req.body });
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        next(err);
    }
};

export const UpdateProduct = async (req, res, next) => {
    try {
        const Cart = await Order.findById(req.params.id)
        if (!Cart) return next(createError(404, "Cart not found!"))
        if (req.user.id === Cart.userId) {
            const updatedCart = await Order.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(updatedCart)
        } else {
            return next(createError(403, "You can update only your permissions!"))
        }
    } catch (error) {
        next(error)
    }
}

export const DeleteProduct = async (req, res, next) => {
    try {
        const Cart = await Order.findById(req.params.id)
        if (!Cart) return next(createError(404, "Cart not found!"))
        if (req.user.id === Cart.userId) {
            await Order.findByIdAndUpdate(
                req.params.id,
            );
            res.status(200).json("the cart has been deleted")
        } else {
            return next(createError(403, "You can delete only your permissions!"))
        }
    } catch (error) {
        next(error)
    }
}


//GET ALL PRODUCT USING USER PARTS USING THIS WAYS
export const getProduct = async (req, res, next) => {
    try {
        const Cart = await Order.findById(req.params.id)
        res.status(200).json(Cart)
    } catch (error) {
        next(error)
    }
}


//order values
export const sub = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;

        //   console.log(subscribedChannels);
        //     const Cart = await Order.findById(subscribedChannels);
        //     console.log(Cart);
        //     res.status(200).json(Cart);  

        const list = await Promise.all(
            subscribedChannels.map(async (orderId) => {
                return await User.find({ orderId: orderId });
            })
        );

        //   res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
        next(err);
    }
};

export const randomCard = async (req, res, next) => {
    try {
        const card = await Order.aggregate([{ $sample: { size: 60 } }]);

        res.status(200).json(card);

    } catch (err) {
        next(err);
    }
};

export const gujaratiDish = async (req, res, next) => {
    try {
        const card = await Order.aggregate([{ $sample: { size: 60 } }]);

        // Filter the card array based on the condition
        const filteredCard = card.filter(item => item.type === "gujarati");

        // Send the response with filtered data
        res.status(200).json(filteredCard);

        // console.log("any error");
        //i change this
        // res.status(200).json("values Enter successfully");
    } catch (err) {
        next(err);
    }
};

export const chineseDish = async (req, res, next) => {
    try {
        const card = await Order.aggregate([{ $sample: { size: 60 } }]);

        // Filter the card array based on the condition
        const filteredCard = card.filter(item => item.type === "chinese");

        // Send the response with filtered data
        res.status(200).json(filteredCard);

        // console.log("any error");
        //i change this
        // res.status(200).json("values Enter successfully");
    } catch (err) {
        next(err);
    }
};

export const punjabiDish = async (req, res, next) => {
    try {
        const card = await Order.aggregate([{ $sample: { size: 60 } }]);

        // Filter the card array based on the condition
        const filteredCard = card.filter(item => item.type === "punjabi");

        // Send the response with filtered data
        res.status(200).json(filteredCard);

        // console.log("any error");
        //i change this
        // res.status(200).json("values Enter successfully");
    } catch (err) {
        next(err);
    }
};

export const southindianDish = async (req, res, next) => {
    try {
        const card = await Order.aggregate([{ $sample: { size: 60 } }]);

        // Filter the card array based on the condition
        const filteredCard = card.filter(item => item.type === "southindian");

        // Send the response with filtered data
        res.status(200).json(filteredCard);

        // console.log("any error");
        //i change this
        // res.status(200).json("values Enter successfully");
    } catch (err) {
        next(err);
    }
};

