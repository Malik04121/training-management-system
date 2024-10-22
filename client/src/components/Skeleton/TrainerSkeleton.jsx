import React from 'react';

const TrainerSkeleton = () => {
    return (
        <div className='flex'>
            <div className='w-[25%] p-4 bg-lightGrey h-screen'>
                <h2 className='text-lg font-semibold mb-4 text-darkGrey animate-pulse'>Filter Trainers</h2>
                
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-darkGrey animate-pulse'>Hourly Rate:</label>
                    <div className='h-6 bg-gray-300 rounded animate-pulse mb-2'></div>
                    <div className='flex justify-between mt-2 text-darkGrey'>
                        <span className='animate-pulse'>Min: $0</span>
                        <span className='animate-pulse'>Max: $0</span>
                    </div>
                </div>

                <div className='mb-4'>
                    <label className='block text-sm font-medium text-darkGrey animate-pulse'>Minimum Rating</label>
                    <input
                        type='number'
                        className='w-full h-10 px-3 bg-gray-300 rounded animate-pulse'
                        placeholder='Enter min rating'
                    />
                </div>
            </div>

            <div className='w-[75%] p-4'>
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
                            <button 
                                className="bg-gray-300 h-10 rounded animate-pulse w-full"
                            ></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrainerSkeleton;
