import express  from 'express';
import {  AddProduct, DeleteProduct,addUserProduct, chineseDish, getProduct,  gujaratiDish,  punjabiDish,  randomCard,  southindianDish,  sub} from '../controllers/order.js';
import { verifyAdminToken, verifyToken } from '../verifyToken.js';
import uploadData from '../MulterForImage/multerConfig.js';

const router=express.Router()


//ADD PRODUCT
// router.post("/",verifyAdminToken,AddProduct)

router.post("/", verifyAdminToken, AddProduct);

//ADD PRODUCT
router.post("/userOrder",verifyToken,addUserProduct)

//update Product

//Delete PRODUCTS
router.put("/:id",verifyAdminToken,DeleteProduct)

//get PRODUCTS
router.get("/find/:id",verifyAdminToken,getProduct)

//Add to Cart
router.get("/sub/:id",verifyToken, sub)

// //Add to Cart
// router.get("/sub",verifyToken, sub)


//random Card
router.get("/randomCard", randomCard)

//gujarati Card
router.get("/gujaratiDish", gujaratiDish)

//chinese Card
router.get("/chineseDish", chineseDish)

//punjabi Card
router.get("/punjabiDish", punjabiDish)

//southindian Card
router.get("/southindianDish", southindianDish)


export default router;