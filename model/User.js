const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  email: {
    required: true,
    type: String,
    max: 255,
  },

  password: {
    max: 2040,
    required: true,
    type: String,
  },

  confirm_password: {
    max: 2040,
    required: true,
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
