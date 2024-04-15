// const redisService = require("./redis_service");
const otpGenerator = require("otp-generator");
const OTPModel = require("../models/otpModel");
// const redisClient = redisService.getClient();

module.exports = {
  generateOtp: async ({ purpose, value }) => {
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      digits: true,
      specialChars: false,
    });

    const key = `OTP/${purpose}/${value.trim().replace(" ", "")}`;

    // await redisClient.set(key, otp, "EX", process.env.OTP_EXPIRY);
    // const ttl = await redisClient.ttl(key);
    const ttl =12;
    return { otp, ttl };
  },

  checkValidOTP: async ({ purpose, value, otp }) => {
    const key = `OTP/${purpose}/${value.trim().replace(" ", "")}`;

    // const encryptedOtp = await redisClient.get(key);
    const encryptedOtp =123;
    if (!encryptedOtp) {
      return false;
    }
    if (encryptedOtp != otp) {
      return false;
    }

    return true;
  },

  checkOTPExpiry: async ({ purpose, value }) => {
    const key = `OTP/${purpose}/${value.trim().replace(" ", "")}`;

    const encrptedOtp = await OTPModel.findOne({otp:value})
    if (!encrptedOtp) {
      return false;
    }
    // const ttl = await redisClient.ttl(key);
    // return ttl;
  },

  getOTP: async ({ purpose, value }) => {
    const key = `OTP/${purpose}/${value.trim().replace(" ", "")}`;

    const encrptedOtp = await OTPModel.findOne({otp:value})
    if (!encrptedOtp) {
      return "otp expired";
    }
    return encrptedOtp;
  },

  deleteOTP: async ({ purpose, value }) => {
    console.log( purpose, value,' purpose, value');
    const key = `OTP/${purpose}/${value.trim().replace(" ", "")}`;
    await  OTPModel.findOneAndDelete({otp:value})
  },
};
