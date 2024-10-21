import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { courseData, deleteCourse, deleteSingleCourse, errorMessage, loadingStatus } from '../../redux/slice/courseSlice';
import { MdDelete } from 'react-icons/md';

const CourseList = () => {
  const courses = useSelector(courseData);
  const courseLoading = useSelector(loadingStatus);
  const courseError = useSelector(errorMessage);
  const dispatch = useDispatch();

  const deleteCourseHandler = (id) => {

    dispatch(deleteCourse(id));
    dispatch(deleteSingleCourse(id));
  };

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">List of Courses</h1>
      {courseLoading && <p className="text-gray-600">Loading...</p>}
      {courseError && <p className="text-red-500">{courseError}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses?.map((course) => (
          <div key={course._id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{course.name}</h2>
            <div className="text-gray-600 mb-1">
              <strong>Category:</strong> {course.category?.name}
            </div>
            <div className="text-gray-600 mb-1">
  <strong>Total Enrolled People:</strong> {course.enrolled_people?.length}
</div>
            <div className="text-gray-600 mb-1">
              <strong>Total Trainers:</strong> {course.trainers?.length}
            </div>

            <div className="text-gray-600 mb-1">
              <strong>Duration:</strong> {course.duration} minutes
            </div>
            <div className="mb-2">
              <strong>Modules:</strong>
              <ul className="list-disc pl-5">
                {course.modules?.map((module) => (
                  <li key={module._id}>{module.name} ({module.moduleDuration} minutes)</li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => deleteCourseHandler(course._id)}
              className="mt-auto hover:text-white text-red-600 bg-white w-full border border-red-600 hover:bg-red-600 rounded-lg font-bold py-2 "
              aria-label="Delete Course"
            >
              Delete
              {/* <MdDelete className='text-2xl' /> */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
