require("./models/Room.js");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Room = mongoose.model("Room");

router.post("/createRoom", async (req, res) => {

    const newRoom = new Room({
        facialDetection: req.body.facialDetection,
        audioDetection: req.body.audioDetection,
        browserTracking: req.body.browserTracking,
        candidateLimit: req.body.candidateLimit,
        timeLimit: req.body.timeLimit,
    })

    if (!newRoom) {
        res.status(200).json({
            header: {
                message: "Error durin room creation",
                code: 1,
            },
            data: {
                newRoom,
            },

        })
    } else {
        await newRoom.save()
            .then(console.log("Room creation working"))
            .catch((err) =>
                res.status(400).json({
                    header: {
                        message: "User cannot be saved",
                        err,
                        code: 1,
                    },
                }))

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
})
module.exports = router;