const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const { registerUser, loginUser, getUserDetails, getUsers, addTrainerByAdmin } = require("../controller/userController");
const { auth, adminAuth } = require("../middleware/auth");

const router = express.Router();
require("dotenv").config();  


const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";



router.post("/signup",registerUser)
router.post("/login",loginUser)
router.get("/userDetail",auth,getUserDetails)
router.get("/", getUsers); 
router.post("/addTrainer",adminAuth,addTrainerByAdmin)



module.exports = router;