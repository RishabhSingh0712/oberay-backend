const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  type: String,
  slang: String,
  image:String,
});

module.exports = mongoose.model("category", CategorySchema);
