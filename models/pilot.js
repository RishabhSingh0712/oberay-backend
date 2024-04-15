const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const pilotSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  license_registeration_no: {
    type: String,
    required: true,
  },
  joining_date: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    default: "pilot",
  },
});

const Pilots = mongoose.model("Pilots", pilotSchema);

module.exports = Pilots;
