const express = require("express");

const user_router = express.Router();
const {
  signUp,
  login,
  userProfile,
  logout,
  changePassword,
  resetPasswordSendEmail,
  resetPassword,
} = require("../controller/user");
const sendEmail = require("../controller/email");
const verify_email = require("../controller/verify_email");
const isAuth = require("../Middleware/isAuth");

user_router
  .post("/signup", signUp)
  .post("/login", login)
  .get("/me", isAuth, userProfile)
  .get("/logout", logout)
  .post("/email", sendEmail)
  .post("/verifyEmail", verify_email)
  .post("/changePassword", isAuth, changePassword)
  .post("/forgotPassword", resetPasswordSendEmail)
  .post("/resetPassword", resetPassword);

module.exports = user_router;
