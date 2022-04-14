require("./models/Room.js");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { protect } = require("./middleware/auth.js");
const router = express.Router();
const Room = mongoose.model("Room");

router.post("/createRoom", protect, async (req, res) => {
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
        newRoom,
      },
    });
  }
});

router.post("/createRoom", protect, async (req, res) => {
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
        newRoom,
      },
    });
  }
});
router.post("/checkRoom", protect, async (req, res) => {
  const room = await Room.findById(req.body.id);
  if (room && room.ended === false) {
    res.status(200).json({
      header: {
        message: "Join Room",
        code: 1,
      },
    });
  } else {
    res.status(400).json({
      header: {
        message: "Room not available",
        code: 0,
      },
    });
  }
});

module.exports = router;
