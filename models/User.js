const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
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
  // ✅ rollNo is unique per student, optional for police
  rollNo: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("User", userSchema);