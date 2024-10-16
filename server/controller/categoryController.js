const Category = require("../model/categoryModel");


const getCategory=async(req,res)=>{
  try {
      const category=await Category.find()
      res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const addCategory=async(req,res)=>{
    try {
        const { name } = req.body; 

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json(newCategory);
    } catch (error) {
      console.log(error,"error")
        res.status(500).json({ error: error.message });
        
    }
}
const deleteCategory=async(req,res)=>{
  try {
   
    const id=req.params.id
    const deletedCategory=await Category.findByIdAndDelete(id)
    return res.status(200).json({message:"Category Deleted Successfully"})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

module.exports={getCategory,addCategory,deleteCategory}