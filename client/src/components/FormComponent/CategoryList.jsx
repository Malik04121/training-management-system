import React from 'react'
import { useSelector } from 'react-redux';
import { categoryData, errorMessage, loadingStatus } from '../../redux/slice/categoriesSlice';

const CategoryList = () => {
  const categories = useSelector(categoryData);
  const categoryError=useSelector(errorMessage)
  const categoryLoading=useSelector(loadingStatus)

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
              Showing all Categories
            </h1>
            {categoryLoading && <p>Loading...</p>}
            {categoryError && <p className="text-red-500">{categoryError}</p>}
            <ul className="space-y-2">
              {categories?.map((category) => (
                <li key={category._id} className="border-b py-2">
                  {category.name}
                </li>
              ))}
            </ul>
    </div>
  )
}

export default CategoryList
