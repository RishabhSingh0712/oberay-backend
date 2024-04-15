const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WishListSchema = new Schema({
  userId:Number,
  products:[
    
  ]
});


module.exports = mongoose.model("wishList", WishListSchema);
