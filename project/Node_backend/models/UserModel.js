const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("./InstituteModel");
//creating schema
function arrayLimit(val) {
  return val.length == 3;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  institute_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  rollNum: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: [{
      type: String,
      required: true,
    }],
    validate: [arrayLimit, 'Need to give 3 different images']
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("users", UserSchema);