/**
 * seedPoliceWhitelist.js
 * Run with: node seedData/seedPoliceWhitelist.js
 * ✅ FIX: Uses MONGO_URI from .env (was hardcoded to localhost before)
 */
require("dotenv").config();
const mongoose = require("mongoose");
const PoliceWhitelist = require("../models/PoliceWhitelist");

// ✅ FIX: Use MONGO_URI env variable so it connects to Atlas, not localhost
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected to Atlas"))
  .catch(err => { console.log(err); process.exit(1); });

const approvedOfficers = [
  { username: "prabhas" },
  // Add more officers here as needed
];

const seed = async () => {
  await PoliceWhitelist.deleteMany();
  await PoliceWhitelist.insertMany(approvedOfficers);
  console.log("✅ Police whitelist seeded successfully");
  console.log("   Approved officers:", approvedOfficers.map(o => o.username).join(", "));
  mongoose.disconnect();
};

seed();