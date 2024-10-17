// import React from "react";
// import { useSelector } from "react-redux";
// import { courseData } from "../redux/slice/courseSlice";
// import { Link, useNavigate } from "react-router-dom";
// import { trimText } from "../utills/textTrim";
// import { toast } from "react-toastify";

// const CourseCard = () => {
//   const courses = useSelector(courseData);
//   const role=localStorage.getItem("role")
//   console.log("inside course")
//   const navigate=useNavigate()

//   const submitHandler=(id)=>{
//    if(role && (role==="User" || role==="Admin")){
//     navigate(`/trainer/${id}`)
//    }
//    else{
//     toast.error("Access denied: Please log in as a User or Admin to proceed.");
//    }
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
//       {courses.map((course, index) => (
//         <div
//           key={index}
//           className="p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200 h-fit bg-lightGrey cursor-pointer"
//         >
//           <div className="mb-2 h-32 w-full flex items-center justify-center overflow-hidden">
//             <img
//               src={course.bannerUrl}
//               alt={course.name}
//               className="w-full h-full object-contain"
//             />
//           </div>
//           <h2 className="text-lg text-darkGrey mb-1 font-bold">{course.name}</h2>
//           {/* <p className="text-base text-gray-500 mb-2">{course.description}</p> */}
//           <p className="text-base text-gray-500 mb-2 overflow-hidden h-20">{trimText(course.description,15)}</p>
//           <div className="mt-2">
//             <p className="text-sm text-gray-600 mb-1">
//               {course.enrolled_people.length} people enrolled
//             </p>
//             <p>{course.category.name}</p>
//           </div>
//           <hr className="mt-3 font-light text-darkGrey border border-darkGrey"></hr>
          
//           <div className="flex justify-between mt-5">
//             <p>{course.modules.length} Module</p>
//             <p>{(course.duration / 60).toFixed(2)} hour</p>
//           </div>
          
//           <button className="bg-white text-primary p-2 w-full mt-3 border border-primary hover:bg-primary hover:text-white" onClick={()=>submitHandler(course._id)}>
//             {/* <Link to={`trainer/${course._id}`}> */}
//               View Detail of Course
//             {/* </Link> */}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CourseCard;

// import React from "react";
// import { useSelector } from "react-redux";
// import { courseData } from "../redux/slice/courseSlice";
// import { Link, useNavigate } from "react-router-dom";
// import { trimText } from "../utills/textTrim";
// import { toast } from "react-toastify";

// const CourseCard = ({ selectedCategory }) => {
//     const courses = useSelector(courseData);
//     const role = localStorage.getItem("role");
//     const navigate = useNavigate();

//     const submitHandler = (id) => {
//         if (role && (role === "User" || role === "Admin")) {
//             navigate(`/trainer/${id}`);
//         } else {
//             toast.error("Access denied: Please log in as a User or Admin to proceed.");
//         }
//     };

//     // Filter courses based on the selected category
//     const filteredCourses = selectedCategory 
//         ? courses.filter(course => course.category._id === selectedCategory._id) 
//         : courses;

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
//             {filteredCourses.slice(0, 3).map((course, index) => ( // Display only the first 3 courses
//                 <div
//                     key={index}
//                     className="p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200 h-fit bg-lightGrey cursor-pointer"
//                 >
//                     <div className="mb-2 h-32 w-full flex items-center justify-center overflow-hidden">
//                         <img
//                             src={course.bannerUrl}
//                             alt={course.name}
//                             className="w-full h-full object-contain"
//                         />
//                     </div>
//                     <h2 className="text-lg text-darkGrey mb-1 font-bold">{course.name}</h2>
//                     <p className="text-base text-gray-500 mb-2 overflow-hidden h-20">{trimText(course.description, 15)}</p>
//                     <div className="mt-2">
//                         <p className="text-sm text-gray-600 mb-1">
//                             {course.enrolled_people.length} people enrolled
//                         </p>
//                         <p>{course.category.name}</p>
//                     </div>
//                     <hr className="mt-3 font-light text-darkGrey border border-darkGrey" />
//                     <div className="flex justify-between mt-5">
//                         <p>{course.modules.length} Module</p>
//                         <p>{(course.duration / 60).toFixed(2)} hour</p>
//                     </div>
//                     <button className="bg-white text-primary p-2 w-full mt-3 border border-primary hover:bg-primary hover:text-white" onClick={() => submitHandler(course._id)}>
//                         View Detail of Course
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default CourseCard;


// import React from "react";
// import { useSelector } from "react-redux";
// import { courseData, loadingStatus } from "../redux/slice/courseSlice"; // Import loading status
// import { Link, useNavigate } from "react-router-dom";
// import { trimText } from "../utills/textTrim";
// import { toast } from "react-toastify";

// const CourseCard = ({ selectedCategory }) => {
//     const courses = useSelector(courseData);
//     const loading = useSelector(loadingStatus); 
//     const role = localStorage.getItem("role");
//     const navigate = useNavigate();

//     const submitHandler = (id) => {
//         if (role && (role === "User" || role === "Admin")) {
//             navigate(`/trainer/${id}`);
//         } else {
//             toast.error("Access denied: Please log in as a User or Admin to proceed.");
//         }
//     };

//     // Filter courses based on the selected category
//     const filteredCourses = selectedCategory 
//         ? courses.filter(course => course.category._id === selectedCategory._id) 
//         : courses;

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
//             {loading ? ( // Show loading state while courses are being fetched
//                 <p className="text-gray-500">Loading courses...</p>
//             ) : (
//                 filteredCourses.slice(0, 3).map((course, index) => ( // Display only the first 3 courses
//                     <div
//                         key={index}
//                         className="p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200 h-fit bg-lightGrey cursor-pointer"
//                     >
//                         <div className="mb-2 h-32 w-full flex items-center justify-center overflow-hidden">
//                             <img
//                                 src={course.bannerUrl}
//                                 alt={course.name}
//                                 className="w-full h-full object-contain"
//                             />
//                         </div>
//                         <h2 className="text-lg text-darkGrey mb-1 font-bold">{course.name}</h2>
//                         <p className="text-base text-gray-500 mb-2 overflow-hidden h-20">{trimText(course.description, 15)}</p>
//                         <div className="mt-2">
//                             <p className="text-sm text-gray-600 mb-1">
//                                 {course.enrolled_people.length} people enrolled
//                             </p>
//                             <p>{course.category.name}</p>
//                         </div>
//                         <hr className="mt-3 font-light text-darkGrey border border-darkGrey" />
//                         <div className="flex justify-between mt-5">
//                             <p>{course.modules.length} Module</p>
//                             <p>{(course.duration / 60).toFixed(2)} hour</p>
//                         </div>
//                         <button className="bg-white text-primary p-2 w-full mt-3 border border-primary hover:bg-primary hover:text-white" onClick={() => submitHandler(course._id)}>
//                             View Detail of Course
//                         </button>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default CourseCard;



import React from "react";
import { useSelector } from "react-redux";
import { courseData, loadingStatus } from "../redux/slice/courseSlice";
import { Link, useNavigate } from "react-router-dom";
import { trimText } from "../utills/textTrim";
import { toast } from "react-toastify";
import CourseCardSkeleton from "./Skeleton/CourseCardSkeleton";


const CourseCard = ({ selectedCategory }) => {
    const courses = useSelector(courseData);
    const loading = useSelector(loadingStatus); 
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    const submitHandler = (id) => {
        if (role && (role === "User" || role === "Admin")) {
            navigate(`/trainer/${id}`);
        } else {
            toast.error("Access denied: Please log in as a User or Admin to proceed.");
        }
    };

    // Filter courses based on the selected category
    const filteredCourses = selectedCategory 
        ? courses.filter(course => course.category._id === selectedCategory._id) 
        : courses;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
            {loading ? (
                Array.from({ length: 3 }, (_, index) => <CourseCardSkeleton key={index} />) // Show skeleton loaders
            ) : (
                filteredCourses.slice(0, 3).map((course, index) => (
                    <div
                        key={index}
                        className="p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200 h-fit bg-lightGrey cursor-pointer"
                    >
                        <div className="mb-2 h-32 w-full flex items-center justify-center overflow-hidden">
                            <img
                                src={course.bannerUrl}
                                alt={course.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <h2 className="text-lg text-darkGrey mb-1 font-bold">{course.name}</h2>
                        <p className="text-base text-gray-500 mb-2 overflow-hidden h-20">{trimText(course.description, 15)}</p>
                        <div className="mt-2">
                            <p className="text-sm text-gray-600 mb-1">
                                {course.enrolled_people.length} people enrolled
                            </p>
                            <p>{course.category.name}</p>
                        </div>
                        <hr className="mt-3 font-light text-darkGrey border border-darkGrey" />
                        <div className="flex justify-between mt-5">
                            <p>{course.modules.length} Module</p>
                            <p>{(course.duration / 60).toFixed(2)} hour</p>
                        </div>
                        <button className="bg-white text-primary p-2 w-full mt-3 border border-primary hover:bg-primary hover:text-white" onClick={() => submitHandler(course._id)}>
                            View Detail of Course
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default CourseCard;
