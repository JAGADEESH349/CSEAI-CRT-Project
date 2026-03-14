const express = require("express");
const cors = require("cors");
const mongoose=require("mongoose");
const Complaint = require("./models/Complaint");

mongoose.connect("mongodb://127.0.0.1:27017/campusSafetyDB")
.then(()=>{
    console.log("mongoDb connected");
})
.catch((err)=>{
    console.log(err);
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.post("/complaints", async (req, res) => {

  const { title, description, category } = req.body;

  const newComplaint = new Complaint({
    title,
    description,
    category
  });

  await newComplaint.save();

  res.json({
    message: "Complaint saved to database"
  });

});

app.get("/complaints", async (req, res) => {

  const complaints = await Complaint.find();

  res.json(complaints);

});

app.patch("/complaints/:id", async (req, res) => {
  const { id } = req.params;

  await Complaint.findByIdAndUpdate(id, { status: "Solved" });

  res.json({ message: "Complaint marked as solved" });
});

app.patch("/complaints/:id/update", async (req, res) => {

  const { title, description } = req.body;

  const updatedComplaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    { title, description },
    { new: true }
  );

  res.json(updatedComplaint);

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});