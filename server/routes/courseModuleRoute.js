



const express=require("express")
const { adminAuth } = require("../middleware/auth")
const { addModule, getModule } = require("../controller/moduleController")

const router=express.Router()

router.post("/addModule",adminAuth,addModule)
router.get("/",getModule)
// router.get("/:id",auth,getIndividualCourse)

module.exports=router