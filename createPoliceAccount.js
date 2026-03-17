/**
 * createPoliceAccount.js
 * Run once: node createPoliceAccount.js
 * Creates prabhas in the new PoliceUser collection + policewhitelists
 */
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt   = require("bcrypt");

const PoliceUser      = require("./models/PoliceUser");
const PoliceWhitelist = require("./models/PoliceWhitelist");

const POLICE_USERNAME = "prabhas";
const POLICE_PASSWORD = "police123";

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // Create police user
    const hash = await bcrypt.hash(POLICE_PASSWORD, 10);
    await PoliceUser.findOneAndUpdate(
      { username: POLICE_USERNAME },
      { username: POLICE_USERNAME, password: hash, role: "police" },
      { upsert: true, new: true }
    );
    console.log(`✅ PoliceUser '${POLICE_USERNAME}' created`);

    // Add to whitelist
    await PoliceWhitelist.findOneAndUpdate(
      { username: POLICE_USERNAME },
      { username: POLICE_USERNAME },
      { upsert: true }
    );
    console.log(`✅ '${POLICE_USERNAME}' added to whitelist`);

    console.log("\nDone! Login with:");
    console.log(`  Username:    ${POLICE_USERNAME}`);
    console.log(`  Password:    ${POLICE_PASSWORD}`);
    console.log(`  Access Code: CAMPUS-POLICE-2025`);

    mongoose.disconnect();
  })
  .catch(err => { console.error(err); process.exit(1); });