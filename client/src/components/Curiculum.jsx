import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleCourse, singleCourseData } from "../redux/slice/courseSlice";

const Curriculum = () => {
  const [openModule, setOpenModule] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const course = useSelector(singleCourseData);

  useEffect(() => {
    dispatch(fetchSingleCourse(id));
  }, [dispatch, id]);

  const toggleModule = (index) => {
    setOpenModule(openModule === index ? null : index);
  };

  return (
    <div className="flex bg-white p-6 rounded-lg shadow-lg">
      <div className="w-1/3 p-4 border-r">
        <h2 className="text-2xl font-bold mb-4 text-darkGrey">{course.name}</h2>
        <img src={course.bannerUrl} alt="Course Banner" className="mb-4 rounded-lg" />
        <p className="mb-2"><strong>Description:</strong> {course.description}</p>
        <p className="mb-2"><strong>Duration:</strong> {course.duration} minutes</p>
        <p className="mb-2"><strong>Category:</strong> {course.category?.name}</p>
        {/* <p className="mb-2"><strong>Enrolled Students:</strong> {course.enrolled_people.length}</p> */}
        <h3 className="font-semibold">Trainers:</h3>
        <ul>
          {course.trainers?.map(trainer => (
            <li key={trainer._id}>{trainer.name} - {trainer.trainerRating} ★</li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 p-4">
        <h2 className="text-2xl font-bold mb-6 text-darkGrey">Curriculum</h2>
        <div className="space-y-4">
          {course.modules?.map((module, moduleIndex) => (
            <div key={module._id}>
              <button
                onClick={() => toggleModule(moduleIndex)}
                className="w-full text-left bg-lightGrey p-4 rounded-lg shadow-md font-semibold text-lg 
                           flex justify-between items-center focus:outline-none hover:bg-primary hover:text-white transition-all duration-300"
              >
                {module.name}
                <span>{openModule === moduleIndex ? "-" : "+"}</span>
              </button>
              {openModule === moduleIndex && (
                <div className="bg-white p-4 mt-2 rounded-lg shadow-md text-gray-700">
                  <p>{module.description}</p>
                  <div className="mt-2">
                    <h3 className="font-semibold">Contents:</h3>
                    {module.moduleContent?.map((content) => (
                      <div key={content._id} className="p-2 border-b">
                        <strong>{content.name}</strong> - {content.duration} min
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
