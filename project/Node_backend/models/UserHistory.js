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
});

  

mongoose.model("History", UserHistory);

