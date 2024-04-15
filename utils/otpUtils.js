const OTPModel = require("../models/otpModel");


async function checkValidOTPMy(data) {
    console.log('works')
    console.log('dataaaa', data)
  const { purpose, value, otp } = data;

  // Assuming you're checking OTPs for a specific purpose and value (e.g., LOGIN with email)
  const otpDocument = await OTPModel.findOne({
    purpose: purpose,
    value: value,
    otp: otp,
  });
  console.log('otpDocument', otpDocument)

  if (!otpDocument) {
    return false; // OTP not found or doesn't match
  }

  // Check if the OTP hasn't expired (you need to define your own expiration logic)
  const currentTimestamp = new Date();
  const otpTimestamp = otpDocument.createdAt;
  const otpExpiryDuration = 5 * 60 * 1000; // OTP expires after 5 minutes (adjust as needed)

  if (currentTimestamp - otpTimestamp > otpExpiryDuration) {
    return false; // OTP has expired
  }

  return true; // OTP is valid
}

module.exports = {
  checkValidOTPMy,
};
