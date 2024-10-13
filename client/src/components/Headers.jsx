import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">

        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/40x40"
            alt="Logo"
            className="h-10"
          />
          <span className="font-semibold text-xl text-gray-800">academy</span>
        </div>


        <div className="flex items-center space-x-6">

          <div className="relative group">
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
          </div>


          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search For Courses"
              className="px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button className="text-gray-600 hover:text-blue-500">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>




          <div className="text-gray-600 hover:text-blue-500">
            <span>Administrator</span>
          </div>


          <div className="space-x-4">
            <button className="text-gray-600 hover:text-blue-500">Log In</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
              Sign Up
            </button>
          </div>
        </div>
      
    </header>
  );
};

export default Header;