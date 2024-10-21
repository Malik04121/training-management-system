import React from 'react';
import { useSelector } from 'react-redux';
import { courseData } from '../redux/slice/courseSlice';
import { Link } from 'react-router-dom';

const Course = () => {
  const courses = useSelector(courseData);
  
//Todo: after search clear input field
  return (
    <div className="p-6 w-[85%] mx-auto min-h-screen">
      <h3>Result For </h3>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200  bg-lightGrey cursor-pointer"
            >
              <div className="mb-2 h-32 w-full flex items-center justify-center overflow-hidden">
                <img
                  src={course.bannerUrl}
                  alt={course.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-lg text-darkGrey mb-1 font-bold">{course.name}</h2>
              <p className="text-base text-gray-500 mb-2">{course.description}</p>
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">
                  {course.enrolled_people.length} people enrolled
                </p>
                <p>{course.category.name}</p>
              </div>
              <hr className="mt-3 font-light text-darkGrey border border-darkGrey"></hr>
              
              <div className="flex justify-between mt-5">
                <p>{course.modules.length} Module</p>
                <p>{(course.duration / 60).toFixed(2)} hour</p>
              </div>
              
              <button className="bg-primary p-2 w-full mt-3 text-white hover:bg-orange-600">
                <Link to={`/trainer/${course._id}`}>
                  View Detail of Course
                </Link>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center h-screen">
          <p className="text-lg text-gray-500">No courses found for selected categories.</p>
        </div>
      )}
    </div>
  );
};

export default Course;
