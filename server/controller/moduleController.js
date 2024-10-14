


const CourseModule = require("../model/courseModuleModel");


const getModule=async(req,res)=>{
  try {
      const module=await CourseModule.find()
      res.status(200).json(module);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const addModule=async(req,res)=>{
    try {
     const { name,description,moduleNumber,moduleDuration,moduleContent,category } = req.body; 
      
    const existingModule = await CourseModule.findOne({ name });
    if (existingModule) {
      return res.status(400).json({ message: "Module already exists" });
    }
    const newModule = new CourseModule({ name,description,moduleNumber,moduleDuration,moduleContent,category });
    await newModule.save();

    res.status(201).json(newModule);
    } catch (error) {
      console.log(error,"error")
        res.status(500).json({ error: error.message });
        
    }
}

module.exports={getModule,addModule}