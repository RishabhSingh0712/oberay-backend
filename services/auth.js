const HttpException = require("../errors/httpException");
const Admin = require("../models/admin");
const otpGenerator = require("otp-generator");
const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const axios = require('axios');
const client = require("twilio")(accountSid, authToken);
const { isEmpty } = require("../utils/empty");
const bcrypt = require("bcrypt");
const {
  generateOtp,
  checkValidOTP,
  deleteOTP,
} = require("../utils/otp_helper");
// const sgMail = require("@sendgrid/mail");
const { SendEmail } = require("../utils/send_email");
// const Pilots = require("../models/pilot");
const OTPModel = require("../models/otpModel");
const { checkValidOTPMy } = require("../utils/otpUtils");
const twilioClient = twilio(
  "AC598f286fc49113bd6f13fddb622c7879",
  "bf744d8544fbd42e26111b298acf187b"
);

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class AuthService {
  constructor() {}
  async login(userData) {
    if (isEmpty(userData)) {
      throw new HttpException(400, "Request body is empty");
    }
    const { email, password, role, otp, phoneNo } = userData;
    console.log("userData", userData);

    // let Model = role === "admin" ? Admin : Pilots;

   const user = await Admin.findOne({
     $or: [{ email: email }, { phoneNo: phoneNo }],
   });

    console.log("newUser", user);

    if (!user ) throw new HttpException(400, "No user found with this email");

    if (otp) {
      console.log("true", true);
      // User provided both password and OTP - decide based on your logic which to use
      // For example, you could give priority to OTP and check if it's valid
      const validOTP = await checkValidOTPMy({
        purpose: "LOGIN",
        value: phoneNo,
        otp,
      });
      console.log("validOtp", validOTP);

      if (validOTP) {
        // Delete OTP and generate token
        await deleteOTP({ purpose: "LOGIN", value: phoneNo });
        const token = await user.generateAuthToken();
        return {
          token,
          user,
        };
      }
    }

    if (password) {
      console.log("password", password);
      // User provided only password - proceed with password-based login
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (!isPasswordMatching) {
        throw new HttpException(400, "Password is incorrect");
      }
      const token = await user.generateAuthToken();
      return {
        token,
        user,
      };
    }

    if (otp) {
      // User provided only OTP - proceed with OTP-based login
      var validOTP = await checkValidOTP({
        purpose: "LOGIN",
        value: email,
        otp,
      });
      console.log("validOtp", validOTP);
      if (!validOTP) {
        throw new HttpException(400, "Invalid OTP");
      }
      // Delete OTP and generate token
      await deleteOTP({ purpose: "LOGIN", value: email });
      const token = await user.generateAuthToken();
      return {
        token,
        user,
      };
    }

    throw new HttpException(
      400,
      "Please provide either password or OTP for login"
    );
  }

  async checkFacebookToken(access_token) {
    try {
      const check = await axios.get(
        `https://graph.facebook.com/me?access_token=${access_token}`
      );
      console.log(check);
      return true;
    } catch (error) {
      console.log(error.response.data.error.message);
      return false;
    }
   }

  async signUpgoogle(access_token) {
    await axios({
     method: 'get',
     url: 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + access_token,
     withCredentials: true
   })
     .then(function (response) {
         console.log('response==>', response.data);
         flag = true;
         id = response.data.kid
         return true
     })
     .catch(function (response) {
         console.log('error');
         return false
     });
   }

  async signup(userData) {
    if (isEmpty(userData)) {
      throw new HttpException(400, "Request body is empty");
    }
    const { email, password, role, phoneNo } = userData;
      if (!email || !password  || !phoneNo) {
        throw new HttpException(400, "All required fields must be provided");
      }

    let Model = role === "pilot" ? Pilots : Admin;
    const hashedPassword = await bcrypt.hash(password, 10); // Calculate hashedPassword here
    const existingUser = await Model.findOne({ email: email });
    const existingPhone = await Model.findOne({ phoneNo: phoneNo });
    if (existingUser) {
      throw new HttpException(400, "User with this email already exists");
    }
    if (existingPhone) {
      throw new HttpException(400, "User with this phoneNo already exists");
    }

    const newUser = new Model({
      email: email,
      password: hashedPassword,
      phoneNo:phoneNo
    });

    await newUser.save();

    const token = await newUser.generateAuthToken();

    return {
      token,
      user: newUser,
    };
  }

  async saveOTPToDatabase(data) {
    console.log("data@@@", data);
    const { purpose, value, otp } = data;

    // Create a new OTP document
    const otpDocument = new OTPModel({
      purpose: purpose,
      value: value,
      otp: otp,
      createdAt: new Date(),
    });

    // Save the OTP document to the database
    try {
      await otpDocument.save();
      console.log("OTP saved to database");
    } catch (error) {
      console.error("Error saving OTP to database:", error);
      throw new Error("Failed to save OTP to database");
    }
  }

  async generateAndSendOTP(destination, purpose) {
    // console.log("data@@@", data);
    const otp = otpGenerator.generate(4, {
      upperCase: false,
      specialChars: false,
      lowerCaseAlphabets:false,
      digits:true,
      upperCaseAlphabets:false

    });
    
    console.log("otp", otp);
    // Store OTP in your database for validation
    try {
      await this.saveOTPToDatabase({
        purpose: purpose,
        value: destination,
        otp: otp,
      });
      // ... (rest of the code)
    } catch (error) {
      console.error("Error saving OTP to database:", error);
      return { error: "Failed to save OTP to database" };
    }

    if (purpose === "FORGOT") {
      // Send OTP via email
      const emailResponse = await SendEmail({
        subject: "OTP for Password Reset",
        email: destination,
        message: "OTP sent to email successfully",
        text: `Your OTP: ${otp}`,
      });
      return emailResponse;
    } else if (purpose === "LOGIN") {
      try {
        const message = await twilioClient.messages.create({
          body: `Your OTP: ${otp}`,
          from: "+13108968943",
          to: destination,
        });
        console.log("Message SID:", message.sid);
        return { message: "OTP sent to phone number successfully" };
      } catch (error) {
        console.error("Error sending SMS:", error);
        return { error: "Failed to send OTP" };
      }
    }
  }

  async forgotPassword(userData) {
    if (isEmpty(userData)) {
      throw new HttpException(400, "Request body is empty");
    }
    const { email } = userData; // {email}

    const user = await Admin.findOne({ email: email });
    if (!user) {
      throw new HttpException(400, "User not found with this email address");
    }

    const { otp } = await generateOtp({ purpose: "FORGOT", value: email });
    const response = await SendEmail({
      subject: "OTP for Password Reset",
      email,
      message: "OTP sent to email successfully",
      text: `Your OTP: ${otp}`,
    });
    return response;
  }

  async resetPassword(userData) {
    if (isEmpty(userData)) {
      throw new HttpException(400, "Request body is empty");
    }
    const { email, otp, newpassword } = userData;
    const user = await Admin.findOne({ email: email });
    if (!user) {
      throw new HttpException(400, "User not found with this email address");
    }
    const valid = await checkValidOTP({
      purpose: "FORGOT",
      value: email,
      otp: otp,
    });
    if (!valid) {
      throw new HttpException(400, "Invalid OTP");
    }
    await deleteOTP({ purpose: "FORGOT", value: email });

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    user.password = hashedPassword;
    await user.save();

    return { message: "Password reset successfully." };
  }
}




module.exports = new AuthService;
