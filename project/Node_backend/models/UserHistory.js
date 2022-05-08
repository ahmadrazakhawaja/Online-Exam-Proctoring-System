const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserHistory = new Schema({
 
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  RoomID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  Verified: {
    type: Boolean,
    required: true,
    default: false
  },
});

  

mongoose.model("History", UserHistory);

