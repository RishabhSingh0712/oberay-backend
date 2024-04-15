const User = require("../models/authModel");
module.exports.register = async (req, res, next) => {
  console.log(req.body);
  const UserData = await new User(req.body).save();
  console.log(UserData);
  // res.send("user register")
  res
    .status(200)
    .json({ data: UserData, message: "Register Successfully" });
};
module.exports.login = async (req, res, next) => {
  const UserDetails = await User.findOne({ email: req.body.email });
  console.log(req.body, UserDetails, "req");
  let loggedIn = false;

  if (
    UserDetails != null &&
    UserDetails.email == req.body.email &&
    UserDetails.pass == req.body.password
  ) {
    loggedIn = true;
    // obj = { ..., loggedIn: true };
    res.status(200).json({
      data: UserDetails,
      loggedIn,
      message: "Login Successfully",
    });
  }
  res.status(201).json(obj);
};

module.exports.signUpWithGoogle=async (req, res)=> {
  const {access_token,mail} = req.body; // {email, password, role}
  const result = await AuthService.signUpgoogle(access_token); // Use the signupService
  if(result){
    const UserDetails = await User.findOne({ email: req.body.email });
    res.status(200).json({data:UserDetails});
  }
  else{
    const UserData = await new User(req.body).save();
    res.status(200).json({data:UserData});
  }

  // Send success response here
 
}

module.exports.che=async (req, res)=> {
  const {access_token,mail} = req.body; // {email, password, role}
  const result = await AuthService.signUpgoogle(access_token); // Use the signupService
  if(result){
    const UserDetails = await User.findOne({ email: req.body.email });
    res.status(200).json({data:UserDetails});
  }
  else{
    const UserData = await new User(req.body).save();
    res.status(200).json({data:UserData});
  }

  // Send success response here
 
}