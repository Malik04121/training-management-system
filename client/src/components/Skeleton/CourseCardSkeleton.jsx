import React from 'react';

const CourseCardSkeleton = () => {
    return (
        <div className="p-4 rounded-lg shadow-lg bg-lightGrey animate-pulse h-fit">
            <div className="mb-2 h-32 w-full flex items-center justify-center overflow-hidden bg-gray-300"></div>
            <h2 className="text-lg bg-gray-300 h-6 rounded mb-2"></h2>
            <p className="text-base bg-gray-300 h-16 rounded mb-2"></p>
            <div className="mt-2">
                <p className="text-sm bg-gray-300 h-4 rounded mb-1"></p>
                <p className="bg-gray-300 h-4 rounded"></p>
            </div>
            <hr className="mt-3 font-light text-darkGrey border border-darkGrey" />
            <div className="flex justify-between mt-5">
                <p className="bg-gray-300 h-4 rounded w-1/3"></p>
                <p className="bg-gray-300 h-4 rounded w-1/3"></p>
            </div>
            <button className="bg-gray-300 h-10 rounded mt-3 w-full"></button>
        </div>
    );
};

export default CourseCardSkeleton;
