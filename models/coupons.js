const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CouponSchema = new Schema({
  coupon: String,
  type: String,
  user: String,
  offer:String,
  isUsed:Boolean
});

module.exports = mongoose.model("coupons", CouponSchema);
