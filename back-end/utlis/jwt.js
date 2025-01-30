var jwt = require("jsonwebtoken");
const validToken = require("../model/accessToken");

const generateToken = async (user) => {
  try {
    const payload = { _id: user._id, roles: user.role, email: user.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    const usr = await validToken.findOne({ userId: user._id });
   
    if (usr) {
        console.log("user found");
      usr.token = token;
        await usr.save();  
        return token;
    }

    await new validToken({ userId: user._id, token: token }).save();

    return token;
  } catch (err) {
    console.error(err);
  }
};

module.exports = generateToken;
