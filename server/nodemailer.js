const nodemailer = require("nodemailer");
require("dotenv").config();
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: "mail@m.com",
//     pass: "pass",
//     clientId: process.env.clientId,
//     clientSecret: process.env.clientSecret,
//     refreshToken: process.env.refreshToken,
//   },
// });
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure:true,
  auth: {
    user: process.env.smtp_user,
    pass: process.env.smtp_pass,
  },
});
module.exports = {
  transporter,
};
