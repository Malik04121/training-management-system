const Course = require("../model/courseModel");


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
    const { name, description, duration,rating, trainers, category } = req.body;

    if (!name || !category) {
      return res.status(400).json({ message: "Name and category are required." });
    }
 
    const newCourse = new Course({
      name,
      description,
      duration,
      rating,
      trainers, 
      category, 
    });

    await newCourse.save();

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCourse, getIndividualCourse,addCourse };