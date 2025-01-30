const emailVerificationModel = require("../model/emailVerificationModel");
const User = require("../model/user");
const sendEmail = require("./email");

const verify_email = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ message: "All fields are required" });

    // check if email exists

    let user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    // check if otp is correct

    let emailVerification = await emailVerificationModel.findOne({
      userId: user._id,
      otp: otp,
    });
    console.log("hello", emailVerification);

    if (!emailVerification && !user.check) {
      sendEmail(user);

      console.log(emailVerification);
      return res
        .status(404)
        .json({ message: "Invalid OTP new OTP sent to your email.." });
    }

    if (user.check)
      return res.status(400).json({ message: "Email already verified" });

    user.check = true;
    await user.save();

    await emailVerificationModel.deleteOne({ userId: user._id });
    return res
      .status(200)
      .json({ isVerified: user.check, message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = verify_email;
