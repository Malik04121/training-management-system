

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  deleteCourseModule, deleteModule, fetchModule, moduleData, moduleError, moduleLoading } from '../../redux/slice/moduleSlice'
import { MdDelete } from 'react-icons/md'
import Pagination from '../PaginationComponent'

const TrainingModuleList = () => {

    const moduleLoader=useSelector(moduleLoading)
    const moduleErrorMessage=useSelector(moduleError)
    const moduleList=useSelector(moduleData)
    const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
    console.log(moduleList,"moduleList")

    const dispatch=useDispatch()

    const deleteModuleHandler=(id)=>{
       dispatch(deleteCourseModule(id))
       dispatch(deleteModule(id))
    }
    useEffect(() => {
      const fetchPaginatedModule = async () => {
        const result = await dispatch(fetchModule({  page: currentPage, limit: 6 }));
        if (result.meta.requestStatus === 'fulfilled') {
          const { totalPages } = result.payload;
          setTotalPages(totalPages);
        }
      };
      fetchPaginatedModule();
    }, [dispatch, currentPage]);
  return (
    <div className="p-6 bg-gray-50">
    <h1 className="text-3xl font-bold mb-6 text-gray-800">List of All Training Modules</h1>
    {moduleLoader && <p className="text-gray-600">Loading...</p>}
    {moduleErrorMessage && <p className="text-red-500">{moduleErrorMessage}</p>}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {moduleList?.map((module) => (
        <div key={module._id} className="bg-white shadow-lg rounded-lg p-4   items-start">
          <div className="flex-1 mr-4">
            <div className="mb-2">
              <span className="text-lg font-semibold text-gray-800">{module.name}</span>
            </div>
            <div className="text-gray-600 mb-1">
              <strong>Category:</strong> {module.category?.name} 
            </div>
            <div className="text-gray-600 mb-4">
              <strong>Duration:</strong> {module.moduleDuration} minutes 
            </div>
          </div>
          <div className='flex align-middle justify-center m-auto'>

          
            {/* <MdDelete className='text-2xl text-red-600'onClick={() => deleteModuleHandler(module._id)} /> */}
            <button
              type="button"
              onClick={() => deleteModuleHandler(module._id)}
              className="mt-auto hover:text-white text-red-600 bg-white w-full border border-red-600 hover:bg-red-600 rounded-lg font-bold py-2 "
              aria-label="Delete Course"
            >
              Delete
            
            </button>
            </div>
        </div>
      ))}
    </div>
    <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage} 
      />
  </div>
  )
}

export default TrainingModuleList
