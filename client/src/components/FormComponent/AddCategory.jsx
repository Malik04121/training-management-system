import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addCategory } from '../../redux/slice/categoriesSlice';

const AddCategory = () => {

    const dispatch=useDispatch()
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");

    const handleCategory = (e) => {
        e.preventDefault();
        dispatch(
          addCategory({ name: categoryName, description: categoryDescription })
        );
        setCategoryName("");
        setCategoryDescription("");
      };
  return (
    <div>
    <h2 className="text-2xl font-semibold mb-4">Add Category</h2>
    <form className="space-y-4" onSubmit={handleCategory}>
      <div>
        <label className="block text-gray-700">Category Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">
          Category Description
        </label>
        <textarea
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Enter category description"
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <button
        className="bg-primary text-white px-4 py-2 rounded-lg"
        type="submit"
      >
        Save Category
      </button>
    </form>
  </div>
  )
}

export default AddCategory
