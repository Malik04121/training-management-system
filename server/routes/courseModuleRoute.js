



const express=require("express")
const { adminAuth } = require("../middleware/auth")
const { addModule, getModule, deleteCourseModule } = require("../controller/moduleController")

const router=express.Router()

router.post("/addModule",adminAuth,addModule)
router.delete("/:id",adminAuth,deleteCourseModule)
router.get("/",getModule)
// router.get("/:id",auth,getIndividualCourse)

module.exports=router