const Course = require("../model/courseModel");
const cloudinary=require("cloudinary")
const multer=require("multer")
const mongoose=require('mongoose')


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getCourse = async (req, res) => {
  try {
    const { categoryId, search, page, limit } = req.query;
    const filter = {};
    
    if (categoryId) {
      if (mongoose.Types.ObjectId.isValid(categoryId)) {
        filter.category = new mongoose.Types.ObjectId(categoryId);
      } else {
        return res.status(400).json({ error: "Invalid category ID" });
      }
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const totalCourses = await Course.countDocuments(filter);
    let courses;
    if (page && limit) {
      const skip = (page - 1) * limit;
      courses = await Course.find(filter)
      .populate("category modules trainers enrolled_people")
        .skip(skip)
        .limit(parseInt(limit));
    } else {
      courses = await Course.find(filter)
        .populate("category modules trainers enrolled_people")
    }

    res.status(200).json({
      courses,
      totalPages: page && limit ? Math.ceil(totalCourses / limit) : 1,
      totalCourses,
      currentPage: page ? parseInt(page) : 1,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
    const { name, description, duration,rating, trainers, category,modules,startDate } = req.body;



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
      courseStartDate:startDate,
      bannerUrl
    });

    await newCourse.save();
    res.status(201).json(newCourse);
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
    await User.updateMany(
      { "courses.courseId": id },  
      { $pull: { courses: { courseId: id } } }  
    );
    return res.status(200).json({message:"Course Deleted Successfully"})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

module.exports = { getCourse, getIndividualCourse,addCourse,deleteCourse };