const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
{
  title: String,

  description: String,

  category: String,

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    default: "Pending"
  }
  
},
{ timestamps: true }
);

module.exports = mongoose.model("Complaint", ComplaintSchema);