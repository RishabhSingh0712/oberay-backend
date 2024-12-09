const Admin = require("../models/admin");
const authModel = require("../models/authModel");
const AuthService = require("../services/auth");
const asyncHandler = require("../utils/async.handler");
// const otpGenerator = require("otp-generator");


class AuthController {
    constructor() {
    // this.authService = new AuthService();
    this.login = asyncHandler(this.login.bind(this)); // Bind the context here
    this.forgotPassword = asyncHandler(this.forgotPassword.bind(this)); // Bind the context here
    this.resetPassword = asyncHandler(this.resetPassword.bind(this)); // Bind the context here
    this.signup = asyncHandler(this.signup.bind(this)); // Bind the context here
    this.deteletUser = asyncHandler(this.deteletUser.bind(this)); // Bind the context here
    
  }
  async login(req, res) {
    const { email, password, role, otp, phoneNo } = req.body; // {email, password, role, otp}
    // console.log("req.body", req.body);

    if (otp ||password) {
        console.log("check");
      const result = await AuthService.login({
        email,
        password,
        role,
        otp,
        phoneNo,
      });
      res.status(200).json(result);
    } 
    else {

      const otpResult = await AuthService.generateAndSendOTP(
        phoneNo,
        "LOGIN"
      );
      console.log("otpResult", otpResult);

      res.status(200).json(otpResult);
    }
  }

  async signUpWithGoogle (req, res) {
    const {access_token,mail} = req.body; // {email, password, role}
    const result = await AuthService.signUpgoogle(access_token); // Use the signupService
    if(result){
      const UserDetails = await authModel.findOne({ email: req.body.email });
      res.status(200).json({data:UserDetails});
    }
    else{
      const UserData = await new authModel(req.body).save();
      res.status(200).json({data:UserData});
    }
    // Send success response here
  }

    async signUpWithFacebook (req, res) {
    const {access_token,mail} = req.body; // {email, password, role}
    const result = await AuthService.checkFacebookToken(access_token); // Use the signupService
    if(result){
      const UserDetails = await authModel.findOne({ email: req.body.email });
      res.status(200).json({data:UserDetails});
    }
    else{
      const UserData = await new authModel(req.body).save();
      res.status(200).json({data:UserData});
    }
    // Send success response here
  }

  async genrateOTP(req, res) {
    
      const {  phoneNo } = req.body; // {email, password, role, otp}
    console.log("req.body", req.body);

    // if (otp ||password) {
    //   const result = await this.authService.login({
    //     email,
    //     password,
    //     role,
    //     otp,
    //     phoneNo,
    //   });
    //   res.status(200).json(result);
    // } else {

      const otpResult = await AuthService.generateAndSendOTP(
        phoneNo,
        "LOGIN"
      );
    //   console.log("otpResult", otpResult);

    // const otp = otpGenerator.generate(6, {
    //     upperCase: false,
    //     specialChars: false,
    //   });

      res.status(200).json(otpResult);
    // }
  }

  async forgotPassword(req, res) {
    const data = req.body;
    const result = await AuthService.forgotPassword(data);
    // Send success response here
    res.status(200).json(result);
  }
  async signup(req, res) {
    const userData = req.body; // {email, password, role}
    console.log(userData, "userrr");
    const result = await AuthService.signup(userData); // Use the signupService
    // Send success response here
    res.status(200).json(result);
  }
  
  async getUserById(req, res) {
    // console.log(req.params,'paramsss');
    const result = await Admin.findOne({ _id: req.params.id}); // Use the signupService
    // Send success response here
    if(result){
      res.status(200).json({data:result,message:"User Data Get"});
      return
    }
    res.status(200).json({message:"User Not Exist!"});

   
    // res.status(200).json("dasdasd")
  }

  async deteletUser(req, res) {
    console.log(req.params,'paramsss');
    const result = await Admin.findByIdAndDelete({ _id: req.params.id}); // Use the signupService
    // Send success response here
    if(result){
      res.status(200).json({data:result,message:"User Deleted"});
      return
    }
    res.status(200).json({message:"User Not Exist!"});

  
  }

  async profile(req, res) {
    const userData = req.body; // {email, password, role}
    console.log(userData,'----------');
   let result = await Admin.findOneAndUpdate(
        { id: userData.userId },
        {...userData},
        { new: true }
    );
    res.status(200).json(result);
  }

  async resetPassword(req, res) {
    const data = req.body;
    const result = await AuthService.resetPassword(data);
    // Send success response here
    res.status(200).json(result);
  }

}

module.exports = AuthController;
