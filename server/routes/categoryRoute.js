

const express=require("express")
const { getCategory, addCategory, deleteCategory } = require("../controller/categoryController")
const { adminAuth } = require("../middleware/auth")

const router=express.Router()

router.post("/",adminAuth,addCategory)
router.delete("/:id",adminAuth,deleteCategory)
router.get("/",getCategory)

module.exports=router