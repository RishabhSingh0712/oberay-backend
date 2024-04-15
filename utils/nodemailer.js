const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Change to your email service provider
  auth: {
    user: "rishu119811@gmail.com", // Your email address
    pass: "John@123kilo", // Your email password or app-specific password
  },
});

module.exports = transporter;
