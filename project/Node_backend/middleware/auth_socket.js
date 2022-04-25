const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("../models/UserModel.js");
require("../models/Room.js");
const User = mongoose.model("users");
const Room = mongoose.model("Room");

exports.protect2 = async (socket, next, io) => {
  let token = socket.handshake.auth.token;
  let room_id = socket.handshake.auth.room;
  if (!token) {
    next(new Error("no token"));
  }
  try {
    // console.log(token);
    const decode = jwt.verify(token, process.env.JWT_Secret);
    // console.log("Decoded", decode);
    socket.user = await User.findById(decode.id);
    socket.room = await Room.findById(room_id);
    if (socket.room === null || socket.user === null) {
      return next(new Error("data not found"));
    }
    // console.log("User", user);
    // console.log("Room", room);
    if (socket.user.isDeleted === true) {
      return next(new Error("User deleted"));
    }
    if (socket.room.ended === true) {
      return next(new Error("Exam already ended"));
    }
    socket.join(room_id);
    console.log(socket.adapter.rooms.get(room_id).size);
    if (
      socket.user._id.toString() !== socket.room.adminID.toString() &&
      socket.adapter.rooms.get(room_id).size &&
      socket.adapter.rooms.get(room_id).size >
        socket.room.candidateLimit[socket.room.candidateLimit.length - 1] + 1
    ) {
      console.log("xxx");
      socket.leave(room_id);
      return next(new Error("Candidate Limit Exceeded"));
    }
    next();
  } catch (err) {
    console.log("err", err);
    return next(new Error("User deleted"));
  }
};
