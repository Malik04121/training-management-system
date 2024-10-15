import React from "react";

import Banner from "../assets/logo.png"
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-700 shadow-md p-5">
      <div className="container mx-auto flex justify-between items-center">

          <Link to="/">
        <div className="flex items-center space-x-4">
          <img
            src={Banner}
            alt="Logo"
            className="h-10"
            />
          {/* <span className="font-semibold text-xl text-gray-800">academy</span> */}
        </div>
            </Link>


        <div className="flex items-center w-96">

          {/* <div className="relative group">
            <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <i className="fas fa-th-large"></i>
              <span>Courses</span>
            </button>

            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2 rounded-md">
              <ul className="py-2">
                <li>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Full Stack
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    All Courses
                  </a>
                </li>
              </ul>
            </div>
          </div> */}


          <div className="flex items-center space-x-2 w-full">
            <input
              type="text"
              placeholder="Search For Courses"
              className="px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-blue-300 w-full"
            />
            <button className="text-gray-600 hover:text-blue-500">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>




          <div className="text-white hover:text-orange-500 text-xl cursor-pointer">
           <Link to="/dashboard">
            <span>Administrator</span>
           </Link>
          </div>


          <div className="space-x-4">
            <button className="text-gray-600 hover:text-blue-500 cursor-pointer"><Link to="/login">Log In</Link></button>
            <button className="bg-red-500 text-xl text-white px-4 py-2 rounded-full hover:text-orange-500">
              <Link to="/register">
              Sign Up
              </Link>
            </button>
          </div>
        </div>
      
    </header>
  );
};

export default Header;