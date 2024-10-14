import React from 'react'
import { useSelector } from 'react-redux';

import { courseData, errorMessage, loadingStatus } from '../../redux/slice/courseSlice';

const CourseList = () => {
  const course = useSelector(courseData);
  const courseLoading=useSelector(loadingStatus)
  const courseError=useSelector(errorMessage)

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
              List of Courses
            </h1>
            {courseLoading && <p>Loading...</p>}
            {/* {courseError && <p className="text-red-500">{courseError}</p>} */}
            <ul className="space-y-2">
              {course?.map((course) => (
                <li key={course._id} className="border-b py-2">
                  {course.name}
                </li>
              ))}
            </ul>
    </div>
  )
}

export default CourseList
