require("./models/Room.js");
require("./models/userHistory.js");

const mongoose = require("mongoose");
const UserHistory = mongoose.model("History");
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
  let filename = null;
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
    filename = req.file.filename;
  }
  console.log('file',filename);
  // upload.none();
  // upload.single("file");
  // const uid = uuidv4()
  // console.log(uid)
  // console.log("body", req.body);
  const facial = [req.body.facialDetection];
  const audio = [req.body.audioDetection];
  const browser = [req.body.browserTracking];
  const candidateLimit = [req.body.candidateLimit];

  const newRoom = new Room({
    adminID: req.User._id,
    facialDetection: facial,
    audioDetection: audio,
    browserTracking: browser,
    candidateLimit: candidateLimit,
    textFile: (req.file ? req.file.originalname : null),
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
    const Room2 = {};

    (Room2.adminID = req.User._id.toString()),
      (Room2.facialDetection =
        newRoom.facialDetection[newRoom.facialDetection.length - 1]);
    Room2.audioDetection =
      newRoom.audioDetection[newRoom.audioDetection.length - 1];
    Room2.browserTracking =
      newRoom.browserTracking[newRoom.browserTracking.length - 1];
    Room2.candidateLimit =
      newRoom.candidateLimit[newRoom.candidateLimit.length - 1];
    (Room2.textFile = req.file.originalname || null), (Room2._id = newRoom._id.toString());
    console.log(Room2);
    
    const checkHistory = await UserHistory.find({
      UserID: req.User._id,
      RoomID: newRoom._id
    });
    console.log('check admin',checkHistory);
    if(checkHistory.length === 0){
      const history = new UserHistory({
        UserID: req.User._id,
        RoomID: newRoom._id
      });
      try {
        await history.save()
      } catch (error) {
        console.log(error)
      }
      console.log( 'history-admin',history);
    }
    

    res.status(200).json({
      header: {
        message: "Room Created",
        code: 0,
      },
      data: {
        uid: uuidv4(),
        newRoom: Room2,
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
  const Room2 = {};
  
  Room2.facialDetection = room.facialDetection[room.facialDetection.length - 1];
  Room2.audioDetection = room.audioDetection[room.audioDetection.length - 1];
  Room2.browserTracking = room.browserTracking[room.browserTracking.length - 1];
  Room2._id = room._id.toString();

  console.log(room.adminID.toString(),req.User._id.toString() );
  if(room.adminID.toString() === req.User._id.toString()){
    Room2.adminID = room.adminID.toString();
    Room2.textFile = room.textFile;
    Room2.admin = true;
  }
  else{
    Room2.admin = false;
  }

  const checkHistory = await UserHistory.find({
    UserID: req.User._id,
    RoomID: room._id
  });
  console.log('check hisory',checkHistory);
  if(checkHistory.length === 0){
    const history = new UserHistory({
      UserID: req.User._id,
      RoomID: room._id
    });
    try {
      await history.save()
    } catch (error) {
      console.log(error)
    }
    console.log( 'history',history);
  }
  

  if (room && room.ended === false) {
    res.status(200).json({
      header: {
        message: "Join Room",
        code: 1,
      },
      data: {
        newRoom: Room2,
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

router.get("/gethistory", protect, async (req, res) => {
  const hist = await UserHistory.find({UserID: req.User._id});
  const RoomData = [];
  console.log('history',hist);

  for(let i=hist.length-1; i >= 0 ; i--){
    const element = hist[i];
    const roomid = element.RoomID;
    const checkRoom = await Room.findById(roomid);
    const RoomObject = {};
    RoomObject['ended'] = checkRoom.ended;
    RoomObject['timeStarted'] = checkRoom.timeStarted;
    RoomObject['roomid'] = checkRoom._id.toString();
    RoomObject['id'] = hist.length - i;
    RoomData.push(RoomObject);
  }
 

  
  

  if (RoomData.length > 0) {
    res.status(200).json({
      header: {
        message: "Data available",
        code: 1,
      },
      data: {
        RoomData
      },
    });
  } else {
    res.status(400).json({
      header: {
        message: "Data not Available",
        code: 0,
      },
      
    });
  }
});

//room_id  // 

module.exports = router;
