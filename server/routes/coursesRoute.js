

const express=require("express")
const { adminAuth, auth } = require("../middleware/auth")
const { addCourse, getCourse, getIndividualCourse, deleteCourse } = require("../controller/courseController");
const multer = require("multer");

const router=express.Router()
const upload = multer({ dest: "uploads/" });


router.post("/addCourse",upload.single('banner'),adminAuth,addCourse)
router.get("/",getCourse)
router.get("/:id",auth,getIndividualCourse)
router.delete("/:id",adminAuth,deleteCourse)

module.exports=router



//todo: show course list in home page as per category selection only ref:udemy .below that show recently added course based on created at after clicking on view more course redirect to course page which show list of all course for that category