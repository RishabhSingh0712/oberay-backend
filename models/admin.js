const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { string } = require("joi");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  phoneNo: {
    type: String,
    // required: true,
    unique: true,
  },
  fullName: {
    type: String,
    // required: true,
  },
  gender: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
    unique: true,
  },
  age: {
    type: String,
    // required: true,
  },
  location: {
    type: String,
    // required: true,
  },
});

adminSchema.methods.generateAuthToken = function () {
  console.log(this._id,'this._id');
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
