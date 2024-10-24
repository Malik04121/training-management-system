import React from "react";

const CourseCardSkeleton = () => {
    return (
        <div className="p-4 rounded-lg shadow-lg bg-white animate-pulse h-[400px] min-w-72">
            <div className="mb-2 h-32 w-full bg-gray-300 rounded"></div>
            <h2 className="text-lg bg-gray-300 h-6 w-3/4 rounded mb-2"></h2>
            <p className="text-base bg-gray-300 h-4 w-full rounded mb-2"></p>
            <div className="mb-4">
                <p className="text-sm bg-gray-300 h-4 w-3/4 rounded mb-1"></p>
                <p className="bg-gray-300 h-4 w-2/4 rounded"></p>
            </div>
            <hr className="mt-1 bg-gray-300 h-px" />
            <div className="flex justify-between mt-2">
                <p className="bg-gray-300 h-4 w-1/3 rounded"></p>
                <p className="bg-gray-300 h-4 w-1/4 rounded"></p>
            </div>
            <div className="mt-3">
                <hr className="h-[1px] bg-gray-300" />
                <button className="bg-gray-300 h-8 w-full rounded mt-2"></button>
            </div>
        </div>
    );
};

export default CourseCardSkeleton;


 


//todo: to run server all the time use setTimout in index.js to print helllo world
//todo: add course start date in userInfo page
//todo:fixed above skeleoton