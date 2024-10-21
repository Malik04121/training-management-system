



import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseData, fetchCourse, loadingStatus } from "../redux/slice/courseSlice";
import { Link, useNavigate } from "react-router-dom";
import { trimText } from "../utills/textTrim";
import { toast } from "react-toastify";
import CourseCardSkeleton from "./Skeleton/CourseCardSkeleton";


const CourseCard = ({ selectedCategory }) => {
    const courses = useSelector(courseData);
    const loading = useSelector(loadingStatus);
    const role = localStorage.getItem("role");
    const navigate = useNavigate();
    const dispatch=useDispatch()

    const submitHandler = (id) => {
        if (role && (role === "User" || role === "Admin")) {
            navigate(`/trainer/${id}`);
        } else {
            toast.error("Access denied: Please log in as a User or Admin to proceed.");
        }
    };
    useEffect(()=>{
 dispatch(fetchCourse())
    },[dispatch])

    const filteredCourses = selectedCategory
        ? courses.filter(course => course.category._id === selectedCategory._id)
        : courses;
    // Todo : convert time formate to 2:00 hours
    return (
        <div className="flex flex-col justify-between item-center gap-10">
            <div className=" basis-[80%]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 items-center">
                {loading ? (
                    Array.from({ length: 3 }, (_, index) => <CourseCardSkeleton key={index} />) 
                ) : (
                    <>
                        {filteredCourses.map((course, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200  bg-white cursor-pointer group h-[400px]"
                            >
                                <div className="mb-2 h-32 w-full flex items-center justify-center overflow-hidden">
                                    <img
                                        src={course.bannerUrl}
                                        alt={course.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <h2 className="text-lg text-darkGrey mb-1 font-bold">{course.name}</h2>
                                <p className="text-base text-gray-500 mb-2 overflow-hidden h-11">{trimText(course.description, 10)}</p>
                                <div className="">
                                    <p className="text-sm text-gray-600 mb-1">
                                        {course.enrolled_people.length} people enrolled
                                    </p>
                                    <p>{course.category.name}</p>
                                </div>
                                <hr className="mt-1 font-light text-darkGrey border border-darkGrey" />
                                <div className="flex justify-between mt-2">
                                    <p>{course.modules.length} Module</p>
                                    <p>{(course.duration / 60).toFixed(2)} hour</p>
                                </div>
                                <div className=" mt-3">

                                    <hr className=" h-[1px] hidden group-hover:block bg-primary" />
                                    <button className=" text-primary  w-full mt-2 text-base font-medium  hidden group-hover:block " onClick={() => submitHandler(course._id)}>
                                        Know More...
                                    </button>
                                </div>
                            </div>
                        ))}


                    </>
                )}

            </div>
            <button className="border border-black py-3 font-bold hover:bg-black hover:text-white transition-all w-56  mx-auto "><Link to="/courses">
                Load More
            </Link>
            </button></div>


    );
};

export default CourseCard;
