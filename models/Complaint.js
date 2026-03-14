const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  status: {
    type: String,
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Complaint", ComplaintSchema);