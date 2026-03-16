const mongoose = require("mongoose");

const policeWhitelistSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("PoliceWhitelist", policeWhitelistSchema);