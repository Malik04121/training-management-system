import React from "react";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {courses.map((course, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
        >
          <div className="mb-4">
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-lg">
              {course.badge}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {course.students.toLocaleString()} students • {course.duration}
          </p>
          <h3 className="font-semibold text-lg text-black mb-2">{course.title}</h3>
          <p className="text-sm text-gray-500">{course.author}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
