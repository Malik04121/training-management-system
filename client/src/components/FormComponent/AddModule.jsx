import React, { useState } from 'react'
import { addModule } from '../../redux/slice/moduleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { categoryData, errorMessage, loadingStatus } from '../../redux/slice/categoriesSlice';
import { toast } from 'react-toastify';

const AddModule = () => {
    const categories = useSelector(categoryData);
    const dispatch=useDispatch()
    const categoryError=useSelector(errorMessage)
    const categoryLoading=useSelector(loadingStatus)
    const [moduleData, setModuleData] = useState({
        name: "",
        description: "",
        moduleNumber: "",
        description: "",
        moduleDuration: "",
        moduleContent: [{ name: "", duration: "" }],
        category:""
        
      });


    const handleModuleChange=(e)=>{
        const {name,value}=e.target

        setModuleData({
          ...moduleData,
          [name]:value
        })
      }

    const handleModuleContentChange = (index, field, value) => {
        const newContent = [...moduleData.moduleContent];
        newContent[index][field] = value;
        setModuleData({ ...moduleData, moduleContent: newContent });
      };
      
      const addModuleContent = () => {
        setModuleData({
          ...moduleData,
          moduleContent: [...moduleData.moduleContent, { name: "", duration: "" }]
        });
      };
      const addModuleData=(e)=>{
        e.preventDefault()
        dispatch(addModule(moduleData))
        toast.success("Module Added Successfully")
      }
  return (
    <div>
    <h1 className="text-2xl font-semibold mb-4">Add Module</h1>
    <form className="space-y-4" onSubmit={addModuleData}>
      <div>
        <label className="block text-gray-700">Module Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Enter module name"
          value={moduleData.name}
          name="name"
          onChange={handleModuleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Module Description</label>
        <textarea
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Enter module description"
          name="description"
          value={moduleData.description}
          onChange={handleModuleChange}
        ></textarea>
      </div>
      <div>
        <label className="block text-gray-700">Module Number</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Enter module number"
          name="moduleNumber"
          value={moduleData.moduleNumber}
          onChange={handleModuleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Module Duration (in Hours)</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Enter module duration"
          name="moduleDuration"
          value={moduleData.moduleDuration}
          onChange={handleModuleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Module Content</label>
        {moduleData.moduleContent.map((content, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 border rounded-lg"
              placeholder="Content name"
              value={content.name}
              onChange={(e) => handleModuleContentChange(index, "name", e.target.value)}
              required
            />
            <input
              type="number"
              className="flex-1 px-4 py-2 border rounded-lg"
              placeholder="Duration (Hours)"
              value={content.duration}
              onChange={(e) => handleModuleContentChange(index, "duration", e.target.value)}
              required
            />
          </div>
        ))} 
         <button
          type="button"
          onClick={addModuleContent}
          className="text-primary bg-white hover:bg-primary hover:text-white border border-primary px-4 py-2 rounded-lg"
        >
          Add Content
        </button> 
      </div>
      <div>
        <label className="block text-gray-700">Select Category</label>
        <select
          className="w-full px-4 py-2 border rounded-lg"
          value={moduleData.selectedCategory}
          onChange={handleModuleChange}
          name="category"
          required
        >
          <option value="">Select a category</option>
          {categoryLoading && <p>Loading...</p>}
          {categoryError && <p className="text-red-500">{categoryError}</p>}
          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button
        className="text-primary bg-white hover:bg-primary hover:text-white border border-primary px-4 py-2 rounded-lg"
        type="submit"
      >
        Save Module
      </button>
    </form>
  </div>
  )
}

export default AddModule
