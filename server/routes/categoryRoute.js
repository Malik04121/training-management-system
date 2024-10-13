

const express=require("express")
const { getCategory, addCategory } = require("../controller/categoryController")
const { adminAuth } = require("../middleware/auth")

const router=express.Router()

router.post("/",adminAuth,addCategory)
router.get("/",getCategory)

module.exports=router