    const mongoose = require("mongoose");

// ✅ Police ONLY — no rollNo, just username + password
const policeUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, default: "police" }
});

module.exports = mongoose.model("PoliceUser", policeUserSchema);