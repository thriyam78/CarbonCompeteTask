const jwt = require("jsonwebtoken");
const User=require("../models/userModel");

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (user.roles!=="admin") {
      return res.status(401).json({
        status: "fail",
        message: "You are not an admin",
      });
    }



    req.user = decoded;
    req.userData = { userId: decoded.userId };

    next();
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Authentication Failed! Invalid Token",
    });
  }
};

module.exports = {checkAuth};