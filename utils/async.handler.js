const HttpException = require("../errors/httpException");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.log(error,'error');
    if (error) {
      res.status(error?.statusCode?error?.statusCode:500).json({ message: error?.message });
    } else {
      // Handle other errors
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

module.exports = asyncHandler;
