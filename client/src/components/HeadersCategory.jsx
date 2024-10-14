

import React from "react";

const categories = [
  "Featured", "Music", "Drawing & Painting", "Marketing", "Animation", 
  "Social Media", "UI/UX Design", "Creative Writing", "Digital Illustration", 
  "Film & Video", "Crafts", "Freelance & Entrepreneurship", "Graphic Design", 
  "Photography", "Productivity"
];

const Categories = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-8">
      {categories.map((category, index) => (
        <button
          key={index}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium text-black"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
