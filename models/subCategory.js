const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  name: String,
  type: String,
  slang: String,
  image:String,

category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'czategory',
    required: true
  },
});

module.exports = mongoose.model("subCategory", SubCategorySchema);
