const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["student", "police"],
    default: "student"
  },
  // ✅ FIX 3: Added rollNo field
  rollNo: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("User", userSchema);