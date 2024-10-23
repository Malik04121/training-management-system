

import React, { useState } from 'react'
import { MdSearch } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCourse, fetchFillterCourse } from '../../redux/slice/courseSlice'

const SearchFunctionality = () => {
  const [searchInput,setSearchInput]=useState("")
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const searchCourse=async()=>{
    await dispatch(fetchFillterCourse({search:searchInput}))
    setSearchInput("")
    navigate("/courses")  
  }
  return (
    
       <div className="flex items-center space-x-2 w-full bg-white rounded-full px-4">
              <input
                type="text"
                placeholder="Search For Courses"
                className="px-4 py-2 rounded-full focus:outline-none  w-full"
                onChange={(e)=>setSearchInput(e.target.value)}
                value={searchInput}
              />
              <button className="text-gray-600 hover:text-blue-500" onClick={searchCourse}>
              <MdSearch className="text-4xl text-primary" />
              </button>
            </div>
    
  )
}

export default SearchFunctionality

