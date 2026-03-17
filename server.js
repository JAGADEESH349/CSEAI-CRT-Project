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

/* ==========================
   MIDDLEWARE
========================== */
app.use(cors({
  origin: "https://fanciful-meerkat-83fea2.netlify.app",
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const POLICE_ACCESS_CODE = process.env.POLICE_ACCESS_CODE || "CAMPUS-POLICE-2025";

/* ==========================
   MULTER SETUP
========================== */
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
.catch(err => {
  console.error("MongoDB Error:", err);
  process.exit(1);
});

/* ==========================
   HEALTH CHECK
========================== */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* ==========================
   REGISTER USER (FIXED)
========================== */
app.post("/register", async (req, res) => {
  try {
    let { username, password } = req.body;

    // ✅ Validation
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    username = username.trim();

    // ✅ Check duplicate user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      role: "student"
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

/* ==========================
   LOGIN USER (FIXED)
========================== */
app.post("/login", async (req, res) => {
  try {
    const { username, password, accessCode } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

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

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token, role: user.role, message: "Login successful" });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
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

function authorizeRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
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

  } catch (err) {
    console.error("COMPLAINT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

/* ==========================
   GET COMPLAINTS
========================== */
app.get("/complaints", authenticateToken, async (req, res) => {
  try {
    if (req.user.role === "student") {
      const complaints = await Complaint.find({ studentId: req.user.id });
      return res.json(complaints);
    }

    const complaints = await Complaint.find();
    res.json(complaints);

  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

/* ==========================
   UPDATE COMPLAINT
========================== */
app.patch("/complaints/:id", authenticateToken, authorizeRole("police"), async (req, res) => {
  try {
    await Complaint.findByIdAndUpdate(req.params.id, { status: "Solved" });
    res.json({ message: "Updated" });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

/* ==========================
   GET TEAM
========================== */
app.get("/team", async (req, res) => {
  try {
    const team = await Team.find().sort({ order: 1 });
    res.json(team);

  } catch (err) {
    console.error("TEAM ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

/* ==========================
   SERVER START (FIXED)
========================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));