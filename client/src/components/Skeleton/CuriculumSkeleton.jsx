import React from "react";

const CurriculumSkeleton = () => {
  return (
    <div className="flex bg-white p-6 rounded-lg shadow-lg">
      <div className="w-1/3 p-4 border-r">
        <div className="bg-gray-300 h-8 mb-4 rounded"></div>
        <div className="bg-gray-300 h-32 mb-4 rounded"></div>
        <div className="bg-gray-300 h-4 mb-2 rounded w-3/4"></div>
        <div className="bg-gray-300 h-4 mb-2 rounded w-2/4"></div>
        <div className="bg-gray-300 h-4 mb-2 rounded w-1/2"></div>
        <div className="font-semibold mb-2">Trainers:</div>
        <div className="bg-gray-300 h-4 mb-2 rounded w-1/2"></div>
        <div className="bg-gray-300 h-4 mb-2 rounded w-1/2"></div>
      </div>
      <div className="w-2/3 p-4">
        <div className="bg-gray-300 h-8 mb-6 rounded"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index}>
              <div className="bg-gray-300 h-10 mb-2 rounded"></div>
              <div className="bg-gray-300 h-20 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurriculumSkeleton;
