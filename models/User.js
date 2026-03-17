const mongoose = require("mongoose");

// ✅ Students ONLY — rollNo is required and unique
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  rollNo:   { type: String, required: true, unique: true },
  role:     { type: String, default: "student" }
});

module.exports = mongoose.model("User", userSchema);