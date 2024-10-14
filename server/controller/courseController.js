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
    const courses = await Course.find(); 
    res.status(200).json(courses); 
  } catch (err) {
    res.status(500).json({ error: err.message }); 
};
}

const getIndividualCourse = async (req, res) => {
  try {
    const courseId = req.params.id; 
    const course = await Course.findById(courseId); 

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
    console.log("body",req.body)

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

    res.status(201).json(newCourse);
  } catch (error) {
    console.log(error,"error inside add course")
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCourse, getIndividualCourse,addCourse };