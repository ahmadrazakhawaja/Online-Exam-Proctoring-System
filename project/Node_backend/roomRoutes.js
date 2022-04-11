require("./models/Room.js");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { protect } = require("./middleware/auth.js");
const router = express.Router();
const Room = mongoose.model("Room");
const { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

router.post("/createRoom", protect, async (req, res) => {
  // const uid = uuidv4()
  // console.log(uid)
  const newRoom = new Room({
    adminID: req.User._id,
    facialDetection: req.body.facialDetection,
    audioDetection: req.body.audioDetection,
    browserTracking: req.body.browserTracking,
    candidateLimit: req.body.candidateLimit,
    timeLimit: req.body.timeLimit,
  });

  if (!newRoom) {
    res.status(400).json({
      header: {
        message: "Error during room creation",
        code: 1,
      },
      data: {
        newRoom,
      },
    });
  } else {
    let er = false;
    await newRoom
      .save()
      .then(console.log("Room creation working"))
      .catch((err) => {
        console.log(err);
        er = true;
        res.status(400).json({
          header: {
            message: "User cannot be saved",
            err,
            code: 1,
          },
        });
      });
    if (er === true) {
      return;
    }
    res.status(200).json({
      header: {
        message: "Room Created",
        code: 0,
      },
      data: {
        uid: uuidv4(),
        newRoom,
      },
    });
  }
});
module.exports = router;
