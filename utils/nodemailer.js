const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Change to your email service provider
  auth: {
    user: "rishabhraipur40@gmail.com", // Your email address
    pass: "ccwnifxqvizavzoy", // Your email password or app-specific password
  },
});

module.exports = transporter;
