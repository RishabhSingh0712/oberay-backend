const HttpException = require("../errors/httpException");
const sgMail = require("@sendgrid/mail");

async function SendEmail({ email, subject, message, text }) {
  try {
    const msg = {
      to: email,
      from: process.env.EMAIL_ID,
      subject: subject,
      text: text,
    };

    await sgMail.send(msg);
    return {
      message: message,
    };
  } catch (err) {
    throw new HttpException(400, "Error in sending email");
  }
}

module.exports = { SendEmail };
