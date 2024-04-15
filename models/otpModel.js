const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  purpose: String,
  value: String,
  otp: String,
  createdAt: Date,
});

const OTPModel = mongoose.model("OTP", otpSchema);

module.exports = OTPModel;


