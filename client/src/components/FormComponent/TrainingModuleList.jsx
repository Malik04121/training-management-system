

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  deleteCourseModule, deleteModule, moduleData, moduleError, moduleLoading } from '../../redux/slice/moduleSlice'
import { MdDelete } from 'react-icons/md'

const TrainingModuleList = () => {

    const moduleLoader=useSelector(moduleLoading)
    const moduleErrorMessage=useSelector(moduleError)
    const moduleList=useSelector(moduleData)
    const dispatch=useDispatch()
console.log(moduleList,"moduleList")
    const deleteModuleHandler=(id)=>{
      console.log(id,"id")
       dispatch(deleteCourseModule(id))
       dispatch(deleteModule(id))
    }
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
              {/* <MdDelete className='text-2xl' /> */}
            </button>
            </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default TrainingModuleList
