//Middle-ware for Authentication
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("../models/UserModel.js");
const User = mongoose.model("users");

exports.protect = async (req, res, next) => {
  let token;
  //send with name authorization (header)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log("this is token ", token);

  if (!token) {
    return res.status(401).json({
      header: {
        message: "Not Authorized to access this route (No Token)",
        code: 1,
      },
    });
    // next("Not Authorized to access this route");
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_Secret);
    console.log("Decoded", decode);
    req.User = await User.findById(decode.id);
    console.log("User", req.User);
    if (req.User.isDeleted === true) {
      return res.status(401).json({
        header: {
          message: "User Account is deleted",
          code: 1,
        },
      });
    }
    next();
  } catch (err) {
    console.log("err", err);
    return res.status(401).json({
      header: {
        message: "User Not Authorized. Token expired or invalid",
        code: 1,
      },
    });
  }
};
