

const express=require("express")
const { adminAuth, auth } = require("../middleware/auth")
const { addCourse, getCourse, getIndividualCourse } = require("../controller/courseController");
const multer = require("multer");

const router=express.Router()
const upload = multer({ dest: "uploads/" });


router.post("/addCourse",upload.single('banner'),adminAuth,addCourse)
router.get("/",getCourse)
router.get("/:id",auth,getIndividualCourse)

module.exports=router