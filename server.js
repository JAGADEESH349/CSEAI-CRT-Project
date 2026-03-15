
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Complaint = require("./models/Complaint");
const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = "supersecretkey";


/* ==========================
   DATABASE CONNECTION
========================== */

mongoose.connect("mongodb://127.0.0.1:27017/campusSafetyDB")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));


/* ==========================
   REGISTER USER
========================== */

app.post("/register", async (req,res)=>{

  try{

    let {username,password,role} = req.body;

    username = username.trim();

    const hashedPassword = await bcrypt.hash(password,10);

    const user = new User({
      username,
      password: hashedPassword,
      role
    });

    await user.save();

    res.json({
      message:"User registered successfully"
    });

  }catch(err){

    console.log(err);

    res.status(500).json({
      message:"Registration failed"
    });

  }

});


/* ==========================
   LOGIN USER
========================== */
app.post("/login", async (req,res)=>{

  const {username,password} = req.body;

  console.log("LOGIN REQUEST:", username, password);

  const user = await User.findOne({ username });

  console.log("USER FOUND:", user);

  if(!user){
    return res.status(401).json({
      message:"User not found"
    });
  }

  const validPassword = await bcrypt.compare(password,user.password);

  console.log("PASSWORD MATCH:", validPassword);

  if(!validPassword){
    return res.status(401).json({
      message:"Invalid password"
    });
  }

  const token = jwt.sign(
    {id:user._id,role:user.role},
    JWT_SECRET,
    {expiresIn:"2h"}
  );

  res.json({
    token,
    role:user.role,
    message:"Login successful"
  });

});

/* ==========================
   AUTH MIDDLEWARE
========================== */

function authenticateToken(req,res,next){

  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if(!token){
    return res.status(403).json({message:"Token required"});
  }

  jwt.verify(token,JWT_SECRET,(err,user)=>{

    if(err){
      return res.status(403).json({message:"Invalid token"});
    }

    req.user = user;

    next();

  });

}


/* ==========================
   CREATE COMPLAINT
========================== */

app.post("/complaints", authenticateToken , async (req,res)=>{

  const {title,description,category} = req.body;

  const complaint = new Complaint({
    title,
    description,
    category,
    studentId: req.user.id
  });

  await complaint.save();

  res.json({
    message:"Complaint saved"
  });

});


/* ==========================
   GET COMPLAINTS
========================== */

app.get("/complaints", authenticateToken , async (req,res)=>{

  // student → only their complaints
  if(req.user.role === "student"){

    const complaints = await Complaint.find({
      studentId:req.user.id
    });

    return res.json(complaints);
  }

  // police → all complaints
  const complaints = await Complaint.find();

  res.json(complaints);

});


/* ==========================
   MARK SOLVED
========================== */

app.patch("/complaints/:id", authenticateToken , async (req,res)=>{

  const {id} = req.params;

  await Complaint.findByIdAndUpdate(id,{status:"Solved"});

  res.json({
    message:"Complaint marked solved"
  });

});


/* ==========================
   UPDATE COMPLAINT
========================== */

app.patch("/complaints/:id/update", authenticateToken , async (req,res)=>{

  const {title,description} = req.body;

  const updatedComplaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    {title,description},
    {new:true}
  );

  res.json(updatedComplaint);

});


/* ==========================
   SERVER START
========================== */

app.listen(5000,()=>{
  console.log("Server running on port 5000");
});

