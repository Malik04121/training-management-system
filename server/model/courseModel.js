

const mongoose= require("mongoose")

const courseSchema=new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   description:{
    type:String
   },
   duration:{
    type:Number
   },
   trainers:[
    {
       type:mongoose.Types.ObjectId,
       ref:"User"
    }
   ],
   category:{
    type:mongoose.Types.ObjectId,
    ref:"Category"
   }
},{ timestamps: true })

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;