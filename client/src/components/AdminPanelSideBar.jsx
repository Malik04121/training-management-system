import React, { useState } from "react";
import { MdDashboard, MdCategory, MdRunCircle } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { FaBook } from "react-icons/fa";

const Sidebar = ({ setActiveSection }) => {
  const [openSection, setOpenSection] = useState(null);
  const userName = localStorage.getItem("username");

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="w-64 h-screen bg-gray-200 shadow-md p-4">
      <div className="flex items-center mb-10">
        <img
          className="w-12 h-12 rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH87TKQrWcl19xly2VNs0CjBzy8eaKNM-ZpA&s"
          alt="admin avatar"
        />
        <div className="ml-3">
          <p className="font-semibold text-gray-800">{userName}</p>
        </div>
      </div>

      <nav className="space-y-2">
        <button
          onClick={() => setActiveSection("dashboard")}
          className="flex items-center text-gray-700 hover:bg-blue-100 p-2 rounded w-full"
        >
          <MdDashboard className="mr-2" /> Dashboard
        </button>

        <div>
          <button
            onClick={() => toggleSection("category")}
            className="flex items-center text-gray-700 hover:bg-blue-100 p-2 rounded w-full"
          >
            <MdCategory className="mr-2" /> Categories
          </button>
          {openSection === "category" && (
            <div className="ml-8 space-y-2">
              <button
                onClick={() => setActiveSection("showCategory")}
                className="text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Show Category
              </button>
              <button
                onClick={() => setActiveSection("addCategory")}
                className="text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Add Category
              </button>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggleSection("module")}
            className="flex items-center text-gray-700 hover:bg-blue-100 p-2 rounded w-full"
          >
            <MdRunCircle className="mr-2" /> Training Module
          </button>
          {openSection === "module" && (
            <div className="ml-8 space-y-2">
              <button
                onClick={() => setActiveSection("showModule")}
                className="text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Show Training Module
              </button>
              <button
                onClick={() => setActiveSection("addModule")}
                className="text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Add Training Module
              </button>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggleSection("courses")}
            className="flex items-center text-gray-700 hover:bg-blue-100 p-2 rounded w-full"
          >
            <FaBook className="mr-2" /> Courses
          </button>
          {openSection === "courses" && (
            <div className="ml-8 space-y-2">
              <button
                onClick={() => setActiveSection("showCourses")}
                className="text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Show Courses
              </button>
              <button
                onClick={() => setActiveSection("addCourses")}
                className="text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Add Courses
              </button>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggleSection("trainer")}
            className="flex items-center text-gray-700 hover:bg-blue-100 p-2 rounded w-full"
          >
            <GiTeacher className="mr-2" /> Trainers
          </button>
          {openSection === "trainer" && (
            <div className="ml-8 space-y-2">
              <button
                onClick={() => setActiveSection("showTrainers")}
                className="text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Show Trainers
              </button>
              <button
                onClick={() => setActiveSection("addTrainers")}
                className="text-gray-600 hover:text-blue-600 w-full text-left"
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
