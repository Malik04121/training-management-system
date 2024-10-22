import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleCourse, singleCourseData } from "../redux/slice/courseSlice";
import Curriculum from "../components/Curiculum"
import CurriculumSkeleton from "../components/Skeleton/CuriculumSkeleton";
const SingleCourse = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const course = useSelector(singleCourseData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchSingleCourse(id));
      } catch (error) {
        console.error("Failed to fetch course:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, []);

  if (loading) {
    return <CurriculumSkeleton />; 
  }

  return (
    <div>
      <Curriculum course={course} /> 
    </div>
  );
}

export default SingleCourse;
