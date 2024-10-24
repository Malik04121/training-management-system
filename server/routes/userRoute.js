const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const { registerUser, loginUser, getUserDetails, getUsers, addTrainerByAdmin, verifyTokenAndRole, logoutUser, addCourseToUser, loginUserDetail, verifyToken } = require("../controller/userController");
const { auth, adminAuth } = require("../middleware/auth");

const router = express.Router();
require("dotenv").config();  


const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";



router.post("/signup",registerUser)
router.post("/login",loginUser)
router.get("/userDetail",auth,getUserDetails)
router.get("/", getUsers); 
router.get("/logout",logoutUser)
router.post("/addTrainer",adminAuth,addTrainerByAdmin)
router.get("/verify",verifyTokenAndRole)
router.get("/verifyToken",verifyToken)
router.get("/loginUserData",loginUserDetail)
router.patch("/:id/courses",auth,addCourseToUser)



module.exports = router;