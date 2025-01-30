const transporter = require("../email/email");
const emailVerificationModel = require("../model/emailVerificationModel");

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit number
};

const sendEmail = async (user) => {
  console.log(user);
  try {
    const otp = generateOTP();
    console.log(`Your OTP is: ${otp}`);

    const emailVerification = new emailVerificationModel({
      userId: user._id,
      otp,
    });
    await emailVerification.save();

    const info = await transporter.sendMail({
      from: '"Auth User 👻" hs3601902@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: "Auth User Verification ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<p> Your OTP Code is <b>${otp}</b> <br/> </p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // res.status(200).json({ message: "Email sent successfully" });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Unable to send email, Please try again later" });
  }
};

module.exports = sendEmail;
