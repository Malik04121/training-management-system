import React from 'react';

const TrainerCardSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-6 w-full">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-gray-200 text-darkGrey p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col justify-between items-left h-[430px] animate-pulse">
                    <div className="flex items-center justify-center mb-4">
                        <div className="h-40 w-40 bg-gray-300 rounded-full"></div>
                    </div>
                    <h2 className="font-semibold text-lg text-center bg-gray-300 h-6 rounded animate-pulse mb-2"></h2>
                    <div>
                        <p className="text-sm bg-gray-300 h-20 rounded animate-pulse mb-2"></p>
                    </div>
                    <div className="flex">
                        <p className="text-sm bg-gray-300 h-4 w-20 rounded animate-pulse mr-2"></p>
                    </div>
                    <p className="text-sm bg-gray-300 h-4 w-1/2 rounded animate-pulse"></p>
                    <button className="bg-gray-300 h-10 rounded animate-pulse w-full"></button>
                </div>
            ))}
        </div>
    );
};

export default TrainerCardSkeleton;
