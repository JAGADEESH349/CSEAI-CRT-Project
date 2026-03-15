const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  roll:  { type: String, required: true },
  email: { type: String, required: true },
  role:  { type: String, required: true },
  desc:  { type: String, required: true },
  color: { type: String, required: true },
  icon:  { type: String, required: true },
  order: { type: Number, required: true }
});

module.exports = mongoose.model("Team", teamSchema);