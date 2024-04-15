const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  userId:String,
  address:[  
  ]
});

module.exports = mongoose.model("address", AddressSchema);
