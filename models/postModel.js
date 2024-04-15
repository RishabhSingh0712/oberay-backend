const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  link: String,
  desc: String,
  about: String,
});

module.exports = mongoose.model("Post", PostSchema);
