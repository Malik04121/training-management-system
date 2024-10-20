import React, { useState } from "react";
import banner from "../assets/bannerImage.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchFillterCourse } from "../redux/slice/courseSlice";

const HeaderBanner = () => {
  const [searchInput,setSearchInput]=useState("")
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const searchCourse=async()=>{
    await dispatch(fetchFillterCourse({search:searchInput}))
    navigate("/courses")  
  }
  return (
    <div className="relative bg-opacity-50 w-full h-screen flex items-center">
       <div className="absolute h-full bg-black top-0  flex justify-center w-full ">
          <img
            src={banner}
            alt="Person"
            className="w-full h-full object-cover rounded"
          />
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-30" /> 

      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center px-4 lg:px-8">
        <div className="lg:w-1/2 text-white">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Bring your <span className="italic text-orange-600">goals</span>{" "}
            into
            <span className="italic text-orange-600"> focus</span>
          </h1>
          <p className="text-lg lg:text-xl mb-8">
            Academy offers online taining and programs that prepare you for
            every career moment
          </p>

          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search our 4000+ courses"
              className="px-4 py-2 w-full max-w-md rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-600 text-black"
              onChange={(e)=>setSearchInput(e.target.value)}
            />
            <button className="bg-orange-600 text-white px-6 py-2 rounded shadow-lg hover:bg-orange-700 transition" onClick={searchCourse}>
              Search
            </button>
          </div>
        </div>

       
        </div>
    </div>
  );
};

export default HeaderBanner;
