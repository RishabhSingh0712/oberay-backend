const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BannerSchema = new Schema({
  productName: String,
  desc: String,
});


const ReviewAndRatingSchema = new Schema({
  comment: String,
  rating:String,
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },

});

BannerSchemaProduct = mongoose.model("banner", BannerSchema);
ReviewAndRatingProduct = mongoose.model("reviewAndRating", ReviewAndRatingSchema);
module.exports= {
    BannerSchemaProduct,
    ReviewAndRatingProduct
}
