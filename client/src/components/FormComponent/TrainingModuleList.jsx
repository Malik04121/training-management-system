

import React from 'react'
import { useSelector } from 'react-redux'
import {  moduleData, moduleError, moduleLoading } from '../../redux/slice/moduleSlice'

const TrainingModuleList = () => {

    const moduleLoader=useSelector(moduleLoading)
    const moduleErrorMessage=useSelector(moduleError)
    const moduleList=useSelector(moduleData)
  return (
    <div>
    <h1 className="text-2xl font-semibold mb-4">
   Showing all Training Module
 </h1>
 {moduleLoading && <p>Loading...</p>}
 {moduleError && <p className="text-red-500">{moduleError}</p>}
 <ul className="space-y-2">
   {moduleList?.map((module) => (
     <li key={module._id} className="border-b py-2">
       {module.name}
     </li>
   ))}
 </ul>
 </div>
  )
}

export default TrainingModuleList
