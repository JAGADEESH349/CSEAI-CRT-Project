/**
 * seedTeam.js
 * Run with: node seedData/seedTeam.js
 * ✅ FIX: Uses MONGO_URI from .env (was hardcoded to localhost before)
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Team = require("../models/Team");

// ✅ FIX: Use MONGO_URI env variable so it connects to Atlas, not localhost
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected to Atlas"))
  .catch(err => { console.log(err); process.exit(1); });

const teamData = [
  {
    name: "Akshay Kumar Reddy", roll: "23701A3102", email: "akshayakki9545@gmail.com",
    role: "Testing, Debugging & Documentation",
    desc: "Responsible for testing the application, identifying bugs, improving stability, and preparing documentation.",
    color: "#EF4444", icon: "FaBug", order: 1
  },
  {
    name: "V. Harshitha", roll: "23701A3130", email: "harshithaveluru639@gmail.com",
    role: "Backend Developer (API Development)",
    desc: "Developed server-side logic using Node.js and Express.js and created APIs for complaint submission and authentication.",
    color: "#10B981", icon: "FaServer", order: 2
  },
  {
    name: "M. Humera Tasneem", roll: "23701A3133", email: "humera.smj@gmail.com",
    role: "Frontend Developer (UI/UX Design)",
    desc: "Designed the user interface and improved usability with responsive layouts and styling.",
    color: "#8B5CF6", icon: "FaPaintBrush", order: 3
  },
  {
    name: "M. Jagadeeswar Reddy", roll: "23701A3134", email: "mulajagadeesh119@gmail.com",
    role: "Full Stack Developer & System Integration Lead",
    desc: "Responsible for developing and integrating the frontend, backend, and database components.",
    color: "#3B82F6", icon: "FaCode", order: 4
  },
  {
    name: "V. Nakshathra", roll: "23701A3155", email: "nakshathra.valmiki106@gmail.com",
    role: "Database Designer (MongoDB Management)",
    desc: "Designed and managed the MongoDB database structure for storing user and complaint information.",
    color: "#F59E0B", icon: "FaDatabase", order: 5
  }
];

const seed = async () => {
  await Team.deleteMany();
  await Team.insertMany(teamData);
  console.log("✅ Team seeded successfully");
  mongoose.disconnect();
};

seed();