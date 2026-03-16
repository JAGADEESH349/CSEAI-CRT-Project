/**
 * seedPoliceWhitelist.js
 * Run with: node seedData/seedPoliceWhitelist.js
 */

const mongoose = require("mongoose");
const PoliceWhitelist = require("../models/PoliceWhitelist");

mongoose.connect("mongodb://127.0.0.1:27017/campusSafetyDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const approvedOfficers = [
  { username: "prabhas" },
];

const seed = async () => {
  await PoliceWhitelist.deleteMany();
  await PoliceWhitelist.insertMany(approvedOfficers);
  console.log("✅ Police whitelist seeded successfully");
  console.log("   Approved officers:", approvedOfficers.map(o => o.username).join(", "));
  mongoose.disconnect();
};

seed();