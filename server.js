require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const mongoose = require("mongoose");
const bcrypt  = require("bcrypt");
const jwt     = require("jsonwebtoken");
const multer  = require("multer");
const path    = require("path");
const fs      = require("fs");

const Complaint      = require("./models/Complaint");
const User           = require("./models/User");        // students only
const PoliceUser     = require("./models/PoliceUser");  // police only
const Team           = require("./models/Team");
const PoliceWhitelist = require("./models/PoliceWhitelist");

const app = express();

// ✅ Auto-create uploads folder on Render (not in git)
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
  console.log("Created uploads/ directory");
}

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

const JWT_SECRET        = process.env.JWT_SECRET        || "supersecretkey";
const POLICE_ACCESS_CODE = process.env.POLICE_ACCESS_CODE || "CAMPUS-POLICE-2025";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename:    (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ─────────────────────────────────────────
   STUDENT REGISTER
───────────────────────────────────────── */
app.post("/register", async (req, res) => {
  try {
    const rawUsername = req.body.username;
    const rawPassword = req.body.password;
    const rawRollNo   = req.body.rollNo;

    // Validate all fields present
    if (!rawUsername || !rawPassword || !rawRollNo)
      return res.status(400).json({ message: "Username, Roll Number and password are required" });

    const username = String(rawUsername).trim();
    const password = String(rawPassword);
    const rollNo   = String(rawRollNo).trim().toUpperCase();

    if (!username) return res.status(400).json({ message: "Username cannot be empty" });
    if (!rollNo)   return res.status(400).json({ message: "Roll Number cannot be empty" });
    if (password.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters" });

    // ✅ Check rollNo uniqueness with a clear message
    const existing = await User.findOne({ rollNo });
    if (existing)
      return res.status(409).json({ message: "An account with this Roll Number already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, rollNo });
    await user.save();

    res.json({ message: "Account created! Please login with your Roll Number." });
  } catch (err) {
    console.log("Register error:", err);
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
});

/* ─────────────────────────────────────────
   LOGIN  (students use rollNo, police use username)
───────────────────────────────────────── */
app.post("/login", async (req, res) => {
  try {
    const rawInput   = req.body.username;   // rollNo for students, username for police
    const rawPassword = req.body.password;
    const accessCode  = req.body.accessCode;

    if (!rawInput || !rawPassword)
      return res.status(400).json({ message: "Credentials are required" });

    const input    = String(rawInput).trim();
    const password = String(rawPassword);

    // ── Police login path ──────────────────────
    if (accessCode) {
      if (accessCode !== POLICE_ACCESS_CODE)
        return res.status(403).json({ message: "Invalid access code" });

      const officer = await PoliceUser.findOne({ username: input });
      if (!officer)
        return res.status(401).json({ message: "Officer not found" });

      const valid = await bcrypt.compare(password, officer.password);
      if (!valid)
        return res.status(401).json({ message: "Invalid credentials" });

      // Check whitelist
      const whitelisted = await PoliceWhitelist.findOne({ username: officer.username });
      if (!whitelisted)
        return res.status(403).json({ message: "Officer not authorized. Contact administration." });

      const token = jwt.sign({ id: officer._id, role: "police" }, JWT_SECRET, { expiresIn: "2h" });
      return res.json({ token, role: "police", message: "Login successful" });
    }

    // ── Student login path ─────────────────────
    const student = await User.findOne({ rollNo: input.toUpperCase() });
    if (!student)
      return res.status(401).json({ message: "Invalid Roll Number or password" });

    const valid = await bcrypt.compare(password, student.password);
    if (!valid)
      return res.status(401).json({ message: "Invalid Roll Number or password" });

    const token = jwt.sign({ id: student._id, role: "student" }, JWT_SECRET, { expiresIn: "2h" });
    return res.json({ token, role: "student", message: "Login successful" });

  } catch (err) {
    console.log("Login error:", err);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
});

/* ─────────────────────────────────────────
   AUTH MIDDLEWARE
───────────────────────────────────────── */
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token required" });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token expired. Please login again." });
    req.user = user;
    next();
  });
}

function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role))
      return res.status(403).json({ message: "Access denied: insufficient role" });
    next();
  };
}

/* ─────────────────────────────────────────
   COMPLAINTS
───────────────────────────────────────── */
// Create
app.post("/complaints", authenticateToken, upload.single("evidence"), async (req, res) => {
  try {
    const data = { ...req.body, studentId: req.user.id };
    if (req.file) data.evidencePath = req.file.filename;
    const complaint = new Complaint(data);
    await complaint.save();
    res.json({ message: "Complaint saved" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to save complaint" });
  }
});

// Get (students see own, police see all)
app.get("/complaints", authenticateToken, async (req, res) => {
  try {
    if (req.user.role === "student") {
      const complaints = await Complaint.find({ studentId: req.user.id });
      return res.json(complaints);
    }
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
});

// Police mark solved
app.patch("/complaints/:id", authenticateToken, authorizeRole("police"), async (req, res) => {
  try {
    await Complaint.findByIdAndUpdate(req.params.id, { status: "Solved" });
    res.json({ message: "Complaint marked solved" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update complaint" });
  }
});

// Student edit own complaint
app.patch("/complaints/:id/student-update", authenticateToken, authorizeRole("student"), async (req, res) => {
  try {
    const complaint = await Complaint.findOne({ _id: req.params.id, studentId: req.user.id });
    if (!complaint)
      return res.status(403).json({ message: "Not authorized to edit this complaint" });

    const allowedFields = ["title","description","incidentLocation","incidentDate","phoneNumber","witnessDetails","accusedName","injuryDetails"];
    const update = {};
    allowedFields.forEach(f => { if (req.body[f] !== undefined) update[f] = req.body[f]; });

    const updated = await Complaint.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update complaint" });
  }
});

// Police full update
app.patch("/complaints/:id/update", authenticateToken, authorizeRole("police"), async (req, res) => {
  try {
    const updated = await Complaint.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update complaint" });
  }
});

/* ─────────────────────────────────────────
   TEAM
───────────────────────────────────────── */
app.get("/team", async (req, res) => {
  try {
    const team = await Team.find().sort({ order: 1 });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch team" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));