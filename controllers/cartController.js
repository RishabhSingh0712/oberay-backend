const CartModel = require("../models/cartModel");
const WishListModel = require("../models/wishlistModal");

module.exports.addCart = async (req, res, next) => {
    const AddCart = await new CartModel(req.body).save();
    res
      .status(200)
      .json({ data: AddCart, message: "Cart Data added Successfully" });
  };
  
  module.exports.getCartData = async (req, res, next) => {
    const cartData = await CartModel.find({ productId: req.params.id });
    res
      .status(200)
      .json({ data: cartData, message: "Cart list get Successfully" });
  };
  

  module.exports.addwishList = async (req, res, next) => {
    const AddwishList = await new WishListModel(req.body).save();
    res
      .status(200)
      .json({ data: AddwishList, message: "Wishlist Data added Successfully" });
  };
  
  module.exports.getwishListData = async (req, res, next) => {
    const wishListData = await WishListModel.find({ productId: req.params.id });
    res
      .status(200)
      .json({ data: wishListData, message: "Wishlist list get Successfully" });
  };
  