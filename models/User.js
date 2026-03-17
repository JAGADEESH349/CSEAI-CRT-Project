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
  // ✅ rollNo: required for students, optional for police
  rollNo: {
    type: String,
    default: "",
    // Required only when role is student
    validate: {
      validator: function(v) {
        if (this.role === "student") return v && v.trim().length > 0;
        return true; // police don't need rollNo
      },
      message: "Roll Number is required for students"
    }
  }
});

// ✅ Unique index only on non-empty rollNo values (ignores police with "")
userSchema.index(
  { rollNo: 1 },
  { unique: true, partialFilterExpression: { rollNo: { $gt: "" } } }
);

module.exports = mongoose.model("User", userSchema);