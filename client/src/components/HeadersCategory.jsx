import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryData, fetchCategory } from "../redux/slice/categoriesSlice";
import { fetchCourse } from "../redux/slice/courseSlice";
import { useNavigate } from "react-router-dom";

const categories = [
  "Featured", "Music", "Drawing & Painting", "Marketing", "Animation", 
  "Social Media", "UI/UX Design", "Creative Writing", "Digital Illustration", 
  "Film & Video", "Crafts", "Freelance & Entrepreneurship", "Graphic Design", 
  "Photography", "Productivity"
];

const Categories = () => {
    const categories = useSelector(categoryData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filterCategory = (id) => {
      dispatch(fetchCourse(id));
    };

    return (
      <div className="py-8">

        <h2 className="mb-5 font-bold text-primary text-4xl">Most Popular Courses</h2>
      <div className="flex flex-wrap justify-center gap-4 ">
        {/* <button>All</button> */}
        {categories.map((category, index) => (
          <button
          key={index}
          className="px-4 py-2 bg-lightGrey hover:bg-primary text-darkGrey hover:text-white rounded-lg font-medium transition-all duration-200"
          onClick={() => filterCategory(category._id)}
          >
            {category.name}
          </button>
        ))}
      </div>
        </div>
    );
};

export default Categories;