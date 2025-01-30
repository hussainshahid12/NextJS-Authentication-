const User = require("../model/user");
const bcrypt = require("bcrypt");
const sendEmail = require("./email");
const generateToken = require("../utlis/jwt");
const setCookie = require("../utlis/set_cookie");
const transporter = require("../email/email");
var jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const email_exists = await User.findOne({ email: email });
    if (email_exists)
      return res.status(409).json({ message: "Email already exists" });

    // Hashing the password before storing it in the database

    const user = new User({ name, email, password });
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    sendEmail(user);

    let plainUser = user.toObject();
    delete plainUser.password;

    res
      .status(201)
      .json({ data: plainUser, message: "User registered successfully" });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Unable to Register , Please try again later" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // Await the result of the database query
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the password matches
    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = await generateToken(user);

    setCookie(res, token);
    return res.status(200).json({
      name: user.name,
      token,
      role: user.role,
      isAuth: true,
      message: "Login successful",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const userProfile = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }, { password: 0 });
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.clearCookie("isAuth");
    res.status(200).json({ status: "success", message: "Logout successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "failed",
      message: "Unable to logout ,Please try agian later",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isAuth = await bcrypt.compare(currentPassword, user.password);
    if (!isAuth) {
      return res.status(401).json({ message: "Invalid old password" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPasswordSendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );
    console.log(token);

    const resetLink = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`;
    // Send Email
    const info = await transporter.sendMail({
      from: '"Auth User  👻" hs3601902@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Password Reset Request", // Subject line
      html: `<p>You requested a password reset.</p>
  <p>Click <a href="${resetLink}">here</a> to reset your password <b> in 10 Minutes</b>s.Token is expire after 10 Minutes</p>`,
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ token, message: "Email sent successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  login,
  userProfile,
  logout,
  changePassword,
  resetPasswordSendEmail,
  resetPassword,
};
