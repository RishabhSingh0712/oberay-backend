const unhandledError = function () {
    process.on("unhandledRejection", (err) => {
      console.log(err);
      process.exit(1);
    });
    process.on("uncaughtException", (err) => {
      console.log(err);
      process.exit(1);
    });
    process.on("warning", (err) => {
      console.log(err);
      process.exit(1);
    });
  };
  
  module.exports = unhandledError;