require("./models/Room.js");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { protect } = require("./middleware/auth.js");
const router = express.Router();
const Room = mongoose.model("Room");
const multer = require("multer");
const path = require("path");
const FormData = require("form-data");
const axios = require("axios");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "question_papers/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/createRoom", protect, upload.single("file"), async (req, res) => {
  if (req.file) {
    if (
      path.extname(req.file.originalname) === ".doc" ||
      path.extname(req.file.originalname) === ".pdf"
    ) {
      fs.rm(`question_papers/${req.file.filename}`, (err) => {
        console.log(err);
      });
      console.log(".doc file error");
      return res.status(400).json({
        header: {
          message: ".doc or .pdf file not allowed",
          code: 1,
        },
      });
    }
  }
  // upload.none();
  // upload.single("file");
  // const uid = uuidv4()
  // console.log(uid)
  // console.log("body", req.body);
  const newRoom = new Room({
    adminID: req.User._id,
    facialDetection: req.body.facialDetection,
    audioDetection: req.body.audioDetection,
    browserTracking: req.body.browserTracking,
    candidateLimit: req.body.candidateLimit,
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

    if (req.file) {
      console.log(req.file);
      const form = new FormData();
      form.append(
        "document",
        fs.createReadStream(`question_papers/${req.file.filename}`)
      );
      console.log(path.extname(req.file.originalname));
      form.append("room", newRoom._id.toString());
      form.append("file-type", path.extname(req.file.originalname));
      const formHeaders = form.getHeaders();
      const url = "http://127.0.0.1:4000/PyDocument";
      await axios
        .post(url, form, {
          headers: {
            ...formHeaders,
          },
        })
        .then(function (response) {
          // returners = response.data;
          console.log("response", response.data);
        })
        .catch(function (error) {
          // console.log(error, "problem here");
          console.log("problem with document upload");
          er = true;
        });
      fs.rm(`question_papers/${req.file.filename}`, (err) => {
        console.log(err);
      });
    }
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

// router.post("/createRoom", protect, async (req, res) => {
//   const newRoom = new Room({
//     adminID: req.User._id,
//     facialDetection: req.body.facialDetection,
//     audioDetection: req.body.audioDetection,
//     browserTracking: req.body.browserTracking,
//     candidateLimit: req.body.candidateLimit,
//     timeLimit: req.body.timeLimit,
//   });

//   if (!newRoom) {
//     res.status(400).json({
//       header: {
//         message: "Error during room creation",
//         code: 1,
//       },
//       data: {
//         newRoom,
//       },
//     });
//   } else {
//     let er = false;
//     await newRoom
//       .save()
//       .then(console.log("Room creation working"))
//       .catch((err) => {
//         console.log(err);
//         er = true;
//         res.status(400).json({
//           header: {
//             message: "User cannot be saved",
//             err,
//             code: 1,
//           },
//         });
//       });
//     if (er === true) {
//       return;
//     }
//     res.status(200).json({
//       header: {
//         message: "Room Created",
//         code: 0,
//       },
//       data: {
//         newRoom,
//       },
//     });
//   }
// });

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
