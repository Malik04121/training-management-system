import React from "react";
import { useSelector } from "react-redux";
import { courseData } from "../redux/slice/courseSlice";
import { Link } from "react-router-dom";

const courses = [
  {
    students: 88151,
    duration: "1h 13m",
    title: "YouTube Success: Script, Shoot & Edit with MKBHD",
    author: "Marques Brownlee",
    badge: "Original"
  },
  {
    students: 9635,
    duration: "1h 16m",
    title: "Music Fundamentals: Explore & Create Your Unique Sound",
    author: "Jacob Collier",
    badge: "Original"
  },
  // Add more course objects similarly
];

const CourseCard = () => {
  const courses=useSelector(courseData)


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    {courses.map((course, index) => (
      <div
        key={index}
        className=" p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200 h-fit bg-blue-100 cursor-pointer"
      >
        <div className="mb-2 h-32 w-full  flex items-center justify-center overflow-hidden">
          <img
            src={course.bannerUrl}
            alt={course.name}
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className=" text-lg text-black mb-1 font-bold">{course.name}</h2>
        <p className="text-base text-gray-500 mb-2">{course.description}</p>
        <div className="mt-2">
        <p className="text-sm text-gray-600 mb-1">
          {course.enrolled_people.length} people enrolled
        </p>
        <p>
          {course.category.name}
        </p>
        </div>
      <hr className="mt-3  font-light text-black border border-black"></hr>
       
        <div className="flex justify-between mt-5">
          <p>{course.modules.length} Module</p>
          <p>{(course.duration/60).toFixed(2)} hour</p>
        </div>
        <button className="bg-blue-800 p-2 w-full mt-3 text-white" ><Link to={`trainer/${course._id}`}> View Detail of Course</Link></button>

      </div>
    ))}
  </div>
  
  );
};

export default CourseCard;
