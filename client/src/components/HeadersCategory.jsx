// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { categoryData, fetchCategory } from "../redux/slice/categoriesSlice";
// import { fetchCourse } from "../redux/slice/courseSlice";
// import { useNavigate } from "react-router-dom";

// const categories = [
//   "Featured", "Music", "Drawing & Painting", "Marketing", "Animation", 
//   "Social Media", "UI/UX Design", "Creative Writing", "Digital Illustration", 
//   "Film & Video", "Crafts", "Freelance & Entrepreneurship", "Graphic Design", 
//   "Photography", "Productivity"
// ];

// const Categories = () => {
//     const categories = useSelector(categoryData);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const filterCategory = (id) => {
//       dispatch(fetchCourse(id));
//     };

//     return (
//       <div className="py-8">

//         <h2 className="mb-5 font-bold text-primary text-4xl">Most Popular Courses</h2>
//       <div className="flex flex-wrap justify-center gap-4 ">
//         {/* <button>All</button> */}
//         {categories.map((category, index) => (
//           <button
//           key={index}
//           className="px-4 py-2 bg-lightGrey hover:bg-primary text-darkGrey hover:text-white rounded-lg font-medium transition-all duration-200"
//           onClick={() => filterCategory(category._id)}
//           >
//             {category.name}
//           </button>
//         ))}
//       </div>
//         </div>
//     );
// };

// export default Categories;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { categoryData } from "../redux/slice/categoriesSlice";
// import { fetchCourse } from "../redux/slice/courseSlice";

// const Categories = ({ setSelectedCategory }) => { // Accept the setter as a prop
//     const categories = useSelector(categoryData);
//     const dispatch = useDispatch();

//     const filterCategory = (category) => {
//         setSelectedCategory(category); // Set the selected category in Home
//         dispatch(fetchCourse(category._id)); // Fetch courses based on the selected category
//     };

//     return (
//         <div className="py-8">
//             <h2 className="mb-5 font-bold text-primary text-4xl">Most Popular Courses</h2>
//             <div className="flex flex-wrap justify-center gap-4 ">
//                 {categories.map((category, index) => (
//                     <button
//                         key={index}
//                         className="px-4 py-2 bg-lightGrey hover:bg-primary text-darkGrey hover:text-white rounded-lg font-medium transition-all duration-200"
//                         onClick={() => filterCategory(category)} // Pass the entire category object
//                     >
//                         {category.name}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Categories;


// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { categoryData, loadingStatus } from "../redux/slice/categoriesSlice"; // Import loading status
// import { fetchCourse } from "../redux/slice/courseSlice";

// const Categories = ({ setSelectedCategory }) => {
//     const categories = useSelector(categoryData);
//     const dispatch = useDispatch();
//     const loading = useSelector(loadingStatus); // Select loading state from Redux

//     const filterCategory = (category) => {
//         setSelectedCategory(category); // Set the selected category in Home
//         dispatch(fetchCourse(category._id)); // Fetch courses based on the selected category
//     };

//     return (
//         <div className="py-8">
//             <h2 className="mb-5 font-bold text-primary text-4xl">Most Popular Courses</h2>
//             <div className="flex flex-wrap justify-center gap-4 ">
//                 {categories.map((category, index) => (
//                     <button
//                         key={index}
//                         className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                             loading ? "bg-lightGrey" : 
//                             category.selected ? "bg-primary text-white" : "bg-lightGrey text-darkGrey hover:bg-primary hover:text-white"
//                         }`} 
//                         onClick={() => filterCategory(category)} // Pass the entire category object
//                     >
//                         {category.name}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Categories;



import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryData, loadingStatus } from "../redux/slice/categoriesSlice"; // Import loading status
import { fetchCourse } from "../redux/slice/courseSlice";

const Categories = ({ setSelectedCategory }) => {
    const categories = useSelector(categoryData);
    console.log(categories,"categories")
    const dispatch = useDispatch();
    const loading = useSelector(loadingStatus); // Select loading state from Redux
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // State to track selected category

    const filterCategory = (category) => {
        setSelectedCategory(category); // Set the selected category in Home
        dispatch(fetchCourse(category._id)); // Fetch courses based on the selected category
        setSelectedCategoryId(category._id); // Update selected category ID
    };

    return (
        <div className="py-8">
            <h2 className="mb-5 font-bold text-primary text-4xl">Most Popular Courses</h2>
            <div className="flex flex-wrap justify-center gap-4 ">
                {categories.map((category) => (
                    <button
                        key={category._id} // Use unique ID for key
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                            loading 
                                ? "bg-lightGrey" 
                                : selectedCategoryId === category._id // Check if this category is selected
                                ? "bg-orange-500 text-white" // Use orange background for selected category
                                : "bg-lightGrey text-darkGrey hover:bg-primary hover:text-white"
                        }`}
                        onClick={() => filterCategory(category)} // Pass the entire category object
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Categories;

