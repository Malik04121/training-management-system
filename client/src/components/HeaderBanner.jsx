import React from "react";
import banner from "../assets/bannerImage.jpg";

const HeaderBanner = () => {
  return (
    <div className="relative bg-black w-full h-screen flex items-center">
       <div className="absolute h-full top-0  flex justify-center w-full ">
          <img
            src={banner}
            alt="Person"
            className="w-full h-full object-cover rounded"
          />
      </div>
{/* 
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent" /> */}

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
              className="px-4 py-2 w-full max-w-md rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <button className="bg-orange-600 text-white px-6 py-2 rounded shadow-lg hover:bg-orange-700 transition">
              Search
            </button>
          </div>
        </div>

       
        </div>
    </div>
  );
};

export default HeaderBanner;
