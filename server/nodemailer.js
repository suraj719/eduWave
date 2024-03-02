const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "gitty690@gmail.com",
    pass: "suraj@2012",
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    refreshToken: process.env.refreshToken,
  },
});

const mailOptions = {
  from: "eff@sop.com",
  to: "hi@hi.com",
};
module.exports = {
  transporter,
  mailOptions,
};
