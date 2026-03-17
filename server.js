require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const Complaint = require("./models/Complaint");
const User = require("./models/User");
const Team = require("./models/Team");
const PoliceWhitelist = require("./models/PoliceWhitelist");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const POLICE_ACCESS_CODE = process.env.POLICE_ACCESS_CODE || "CAMPUS-POLICE-2025";

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

/* ==========================
   DATABASE CONNECTION
========================== */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* ==========================
   REGISTER USER
========================== */
app.post("/register", async (req, res) => {
  try {
    let { username, password } = req.body;
    username = username.trim();
    // Role is ALWAYS forced to "student" — police accounts are seeded/admin-created only
    const role = "student";
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

/* ==========================
   LOGIN USER
========================== */
app.post("/login", async (req, res) => {
  const { username, password, accessCode } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

  if (user.role === "police") {
    if (!accessCode || accessCode !== POLICE_ACCESS_CODE) {
      return res.status(403).json({ message: "Unauthorized officer credentials" });
    }
    const whitelisted = await PoliceWhitelist.findOne({ username });
    if (!whitelisted) {
      return res.status(403).json({ message: "Unauthorized officer credentials" });
    }
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "2h" });
  res.json({ token, role: user.role, message: "Login successful" });
});

/* ==========================
   AUTH MIDDLEWARE
========================== */
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token required" });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }
    next();
  };
}

/* ==========================
   CREATE COMPLAINT
========================== */
app.post("/complaints", authenticateToken, upload.single("evidence"), async (req, res) => {
  try {
    const data = { ...req.body, studentId: req.user.id };
    if (req.file) data.evidencePath = req.file.filename;
    const complaint = new Complaint(data);
    await complaint.save();
    res.json({ message: "Complaint saved" });
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: "Failed to save complaint" });
  }
});

/* ==========================
   GET COMPLAINTS
========================== */
app.get("/complaints", authenticateToken, async (req, res) => {
  if (req.user.role === "student") {
    const complaints = await Complaint.find({ studentId: req.user.id });
    return res.json(complaints);
  }
  const complaints = await Complaint.find();
  res.json(complaints);
});

/* ==========================
   MARK SOLVED  (police only)
========================== */
app.patch("/complaints/:id", authenticateToken, authorizeRole("police"), async (req, res) => {
  await Complaint.findByIdAndUpdate(req.params.id, { status: "Solved" });
  res.json({ message: "Complaint marked solved" });
});

/* ==========================
   UPDATE COMPLAINT  (police only)
========================== */
app.patch("/complaints/:id/update", authenticateToken, authorizeRole("police"), async (req, res) => {
  try {
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.json(updated);
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update complaint" });
  }
});

/* ==========================
   GET TEAM MEMBERS
========================== */
app.get("/team", async (req, res) => {
  const team = await Team.find().sort({ order: 1 });
  res.json(team);
});

/* ==========================
   SERVER START
========================== */
app.listen(5000, () => console.log("Server running on port 5000"));