const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId:Number,
  // quantity:Number,
  products:[
    
  ]
});


module.exports = mongoose.model("cart", CartSchema);
