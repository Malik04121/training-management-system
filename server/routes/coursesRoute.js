

const express=require("express")
const { adminAuth, auth } = require("../middleware/auth")
const { addCourse, getCourse, getIndividualCourse } = require("../controller/courseController")

const router=express.Router()

router.post("/addCourse",adminAuth,addCourse)
router.get("/",getCourse)
router.get("/:id",auth,getIndividualCourse)

module.exports=router