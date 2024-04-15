const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { verifyAuthToken } = require("../midlewares/jwtHelper");


router.post("/add-cart",verifyAuthToken, cartController.addCart);
router.get("/get-cart-product/:id",verifyAuthToken, cartController.getCartData);
module.exports = router;
