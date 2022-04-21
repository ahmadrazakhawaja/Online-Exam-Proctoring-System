const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  // roomName: {
  //     type: String,
  //     required: true,
  // },
  adminID: {
    type: Object,
    required: true,
  },
  facialDetection: {
    type: Boolean,
    required: true,
    default: false,
  },
  audioDetection: {
    type: Boolean,
    required: true,
    default: false,
  },
  browserTracking: {
    type: Boolean,
    required: true,
    default: false,
  },
  candidateLimit: {
    type: Number,
    required: true,
  },
  timeLimit: {
    type: String,
    required: false,
  },
  timeStarted: {
    type: Date,
    default: Date.now,
  },
  ended: {
    type: Boolean,
    required: true,
    default: false,
  },
  textFile: {
    type: String,
    required: false,
  },
});

mongoose.model("Room", RoomSchema);
