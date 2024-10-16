import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { errorMessage, fetchSingleCourse, loadingStatus, singleCourseData } from '../redux/slice/courseSlice';
import TrainerCard from '../components/TrainerCard';
import Curriculum from '../components/Curiculum';




const SingleCourse = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const course = useSelector(singleCourseData);
  const loading = useSelector(loadingStatus);
  const error = useSelector(errorMessage);

  useEffect(() => {
    dispatch(fetchSingleCourse(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      {/* Course Banner and Overview */}
      <div className="bg-lightGrey p-6 rounded-lg shadow-lg mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img 
            src={course.bannerUrl} 
            alt={course.name} 
            className="w-full md:w-1/3 h-64 object-cover rounded-lg shadow-md" 
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4 text-darkGrey">{course.name}</h1>
            <p className="text-lg mb-4 text-gray-600">{course.description}</p>
            <p className="text-md text-gray-700 mb-2">Duration: {(course.duration / 60).toFixed(2)} hours</p>
            <p className="text-md text-gray-700 mb-2">Rating: {course.rating} / 5</p>
            <p className="text-md text-gray-700 mb-2">Enrolled People: {course.enrolled_people.length}</p>
            <button className="mt-4 bg-primary hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-200">
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* Trainer Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-darkGrey">Meet the Trainers</h2>
        <TrainerCard trainers={course.trainers} />
      </div>

      {/* Curriculum Section */}
      <div className="mb-8">
        <Curriculum modules={course.modules} />
      </div>
    </div>
  );
};

export default SingleCourse;