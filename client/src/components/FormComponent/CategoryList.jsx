import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { categoryData, deleteCategory, deleteSingleCategory, errorMessage, loadingStatus } from '../../redux/slice/categoriesSlice';
import { MdDelete } from "react-icons/md";

const CategoryList = () => {
  const categories = useSelector(categoryData);
  const categoryError=useSelector(errorMessage)
  const categoryLoading=useSelector(loadingStatus)
  const dispatch=useDispatch()
  console.log(categories,"categories")

  const deleteCategoryHandler=(id)=>{
    console.log(id,"id")
     dispatch(deleteCategory(id))
     dispatch(deleteSingleCategory(id))
  }

  return (
    <div>
    <h1 className="text-2xl font-semibold mb-4">All Categories</h1>
    {categoryLoading && <p>Loading...</p>}
    {categoryError && <p className="text-red-500">{categoryError}</p>}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories?.map((category) => (
        <div key={category._id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
          <span className="text-lg font-medium">{category.name}</span>
          <button 
            type="button" 
            onClick={() => deleteCategoryHandler(category._id)} 
            className="text-red-600 hover:text-red-800"
            aria-label="Delete Category"
          >
            <MdDelete className='text-2xl '/>
          </button>
        </div>
      ))}
    </div>
  </div>
  )
}

export default CategoryList
