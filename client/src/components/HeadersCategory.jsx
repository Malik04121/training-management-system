

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryData, fetchCategory, loadingStatus } from "../redux/slice/categoriesSlice"; 
import { fetchCourse } from "../redux/slice/courseSlice";

const Categories = ({ setSelectedCategory }) => {
    const categories = useSelector(categoryData);
    console.log(categories,"categories")
    const dispatch = useDispatch();
    const loading = useSelector(loadingStatus); 
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); 
    const [showCategories, setShowCategories] = useState(false);

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    const filterCategory = (category) => {
        setSelectedCategory(category);
        dispatch(fetchCourse(category._id)); 
        setSelectedCategoryId(category._id);
    };
    const toggleCategories = () => {
        dispatch(fetchCourse())
        // setShowCategories((prev) => !prev); 
    };

    return (
        <div className="sticky top-20 py-8 basis-[20%]  bg-white px-5 rounded-md ">

            <div className="space-y-3 ">
            <div 
                    className="text-xl font-bold mb-4 cursor-pointer"
                    onClick={toggleCategories}
                >
                    All Categories
                </div>
                {categories.map((category) => (
                    <div
                        key={category._id} 
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200  text-nowrap ${
                            loading 
                                ? "" 
                                : selectedCategoryId === category._id 
                                ? "bg-orange-500 text-white" 
                                : " text-darkGrey hover:bg-primary hover:text-white"
                        }`}
                        onClick={() => filterCategory(category)} 
                    >
                        {category.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;

