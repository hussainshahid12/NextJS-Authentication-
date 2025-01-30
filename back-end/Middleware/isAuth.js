const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    const gettoken = req.cookies.token;
    const wow = req.cookies.isAuth;
    console.log("gettoken", gettoken, wow);

    if (!gettoken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.headers.authorization = "bearer" + " " + gettoken;
    const token = req.get("authorization").split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    if (decoded && decoded.email) {
      req.headers.authorization = token;
      req.user = decoded;
      console.log("req.user", req.user);
      next();
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "You are not authorized to access this route " });
  }
};

module.exports = isAuth;
