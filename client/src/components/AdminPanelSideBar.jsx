import React, { useState } from "react";

const Sidebar = ({ setActiveSection }) => {
  const [openSections, setOpenSections] = useState({});

  

  const toggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className="w-64 h-screen bg-gray-100 p-4">

      <div className="flex items-center mb-10">
        <img
          className="w-12 h-12 rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH87TKQrWcl19xly2VNs0CjBzy8eaKNM-ZpA&s"
          alt="admin avatar"
        />
        <div className="ml-3">
          <p className="font-semibold text-gray-700">admin admin</p>
        </div>
      </div>


      <nav className="space-y-4">

        <div>
          <button
            onClick={() => setActiveSection("dashboard")}
            className="block text-gray-600 hover:text-blue-600 w-full text-left"
          >
            <i className="fas fa-th-large mr-2"></i>Dashboard
          </button>
        </div>


        <div>
          <button
            onClick={() => toggleSection("category")}
            className="block text-gray-600 hover:text-blue-600 w-full text-left"
          >
            <i className="fas fa-layer-group mr-2"></i>Categories
          </button>
          {openSections.category && (
            <div className="ml-4 space-y-2">
              <button
                onClick={() => setActiveSection("showCategory")}
                className="block text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Show Category
              </button>
              <button
                onClick={() => setActiveSection("addCategory")}
                className="block text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Add Category
              </button>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggleSection("module")}
            className="block text-gray-600 hover:text-blue-600 w-full text-left"
          >
            <i className="fas fa-layer-group mr-2"></i>Training Module
          </button>
          {openSections.module && (
            <div className="ml-4 space-y-2">
              <button
                onClick={() => setActiveSection("showModule")}
                className="block text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Show Training Module
              </button>
              <button
                onClick={() => setActiveSection("addModule")}
                className="block text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Add Training Module
              </button>
            </div>
          )}
        </div>


        <div>
          <button
            onClick={() => toggleSection("courses")}
            className="block text-gray-600 hover:text-blue-600 w-full text-left"
          >
            <i className="fas fa-book mr-2"></i>Courses
          </button>
          {openSections.courses && (
            <div className="ml-4 space-y-2">
              <button
                onClick={() => setActiveSection("showCourses")}
                className="block text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Show Courses
              </button>
              <button
                onClick={() => setActiveSection("addCourses")}
                className="block text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Add Courses
              </button>
            </div>
          )}
        </div>


        <div>
          <button
            onClick={() => toggleSection("trainer")}
            className="block text-gray-600 hover:text-blue-600 w-full text-left"
          >
            <i className="fas fa-chalkboard-teacher mr-2"></i>Trainers
          </button>
          {openSections.trainer && (
            <div className="ml-4 space-y-2">
              <button
                onClick={() => setActiveSection("showTrainers")}
                className="block text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Show Trainers
              </button>
              <button
                onClick={() => setActiveSection("addTrainers")}
                className="block text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Add Trainers
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;