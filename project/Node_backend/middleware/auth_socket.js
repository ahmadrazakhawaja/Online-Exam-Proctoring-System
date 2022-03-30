const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("../models/UserModel.js");
require("../models/Room.js");
const User = mongoose.model("users");
const Room = mongoose.model("Room");

exports.protect2 = async (socket, next) => {
  let token = socket.handshake.auth.token;
  let room_id = socket.handshake.auth.room;
  if (!token) {
    next(new Error("no token"));
  }
  try {
    // console.log(token);
    const decode = jwt.verify(token, process.env.JWT_Secret);
    // console.log("Decoded", decode);
    user = await User.findById(decode.id);
    room = await Room.findById(room_id);
    if (room === null || user === null) {
      return next(new Error("data not found"));
    }
    console.log("User", user);
    console.log("Room", room);
    if (user.isDeleted === true) {
      return next(new Error("User deleted"));
    }
    if (room.ended === true) {
      return next(new Error("Exam already ended"));
    }
    next();
  } catch (err) {
    console.log("err", err);
    return next(new Error("User deleted"));
  }
};
