import React from 'react';

const UserProfileSkeleton = () => {
    return (
        <div className="flex bg-gray-200 p-6">
            {/* Left Side: User Profile Skeleton */}
            <div className="w-1/4 bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="mt-4">
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
                </div>
                <div className="mt-4">
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                </div>
                <div className="mt-4">
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                </div>
            </div>

            {/* Right Side: Enrolled Courses Skeleton */}
            <div className="w-3/4 ml-4 bg-white rounded-lg shadow-md p-4 animate-pulse">
                <h3 className="text-lg font-bold text-orange-600 mb-4">Enrolled Courses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="border rounded-lg shadow-sm p-4 bg-gray-50">
                            <div className="h-32 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
                        </div>
                    ))}
                </div>

                <h3 className="text-lg font-bold text-orange-600 mb-4 mt-6">Trainers</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4'>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex items-center border-b py-4">
                            <div className='border rounded-lg shadow-sm p-4 bg-gray-50'>
                                <div className="rounded-full w-10 h-10 bg-gray-300 mb-2"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfileSkeleton;
