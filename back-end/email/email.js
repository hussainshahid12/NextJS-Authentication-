const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "hs3601902@gmail.com",
    pass: "jggt ieno nejn vneh",
  },
});

module.exports = transporter;
