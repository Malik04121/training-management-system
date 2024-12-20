

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
   rating:{
      type:Number
   },
   bannerUrl:{
      type:String
   },
   courseStartDate:{
      type:Date,
      required:true
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
   },
   modules: [{  
      type: mongoose.Types.ObjectId,
      ref: "CourseModule"
  }],
  enrolled_people:[
   {
      type:mongoose.Types.ObjectId,
      ref:"User"
   }
  ]
},{ timestamps: true })

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;