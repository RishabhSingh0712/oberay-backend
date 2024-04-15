const jwt = require("jsonwebtoken");

module.exports.verifyAuthToken = function (req,res,next) {
   let token= getSecTokenfromHeader(req)
   try{
    const authenticateToken = jwt.verify( token, process.env.JWT_SECRET);
    console.log(authenticateToken,'authenticateToken');
     if(authenticateToken){
        next()
   }
     }catch(err){
        res.status(401).json({message:"Unautherised Token"});
     }
  };


  const getSecTokenfromHeader = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  };