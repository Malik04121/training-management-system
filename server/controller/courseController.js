const Course = require("../model/courseModel");
const cloudinary=require("cloudinary")
const multer=require("multer")


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});




const getCourse = async (req, res) => {
  try {

    
    const { categoryId, search } = req.query; 

    const filter = {};
    
    if (categoryId) {
      filter.category = categoryId;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

  
    const courses = await Course.find(filter).populate("category").populate("modules").populate("trainers").populate("enrolled_people"); 
    res.status(200).json(courses); 
  } catch (err) {
    res.status(500).json({ error: err.message }); 
};
}

const getIndividualCourse = async (req, res) => {
  try {
    const courseId = req.params.id; 
    const course = await Course.findById(courseId).populate("category").populate("modules").populate("trainers"); 

    if (!course) {
      return res.status(404).json({ message: "Course not found" }); 
    }

    res.status(200).json(course); 
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
};

const addCourse = async (req, res) => {
  try {
    const { name, description, duration,rating, trainers, category,modules } = req.body;

    console.log(req.body,"body")

    if (!name || !category) {
      return res.status(400).json({ message: "Name and category are required." });
    }
    let bannerUrl = "";
   
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "course_banners",
      });
      bannerUrl = result.secure_url;
    }

     const newCourse = new Course({
      name,
      description,
      duration,
      rating,
      trainers, 
      category, 
      modules,
      bannerUrl
    });

    await newCourse.save();

    res.status(201).json(savedCourses);
    // res.status(201).json("response");
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
};

const deleteCourse=async(req,res)=>{
  try {
   
    const id=req.params.id
    const deletedCourse=await Course.findByIdAndDelete(id)
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({message:"Course Deleted Successfully"})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

module.exports = { getCourse, getIndividualCourse,addCourse,deleteCourse };