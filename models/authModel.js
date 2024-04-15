const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
  fname: String,
  lname: String,
  pass: String,
  cpass: String,
  contact: Number,
  email: String,
  add1: String,
  add2: String,
  city: String,
  pincode: Number,
});

module.exports = mongoose.model("Register-Admin", RegisterSchema);
