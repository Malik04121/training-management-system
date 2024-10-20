import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, singleUser } from '../redux/slice/authenticationSlice';
import { clearState } from '../redux/slice/courseSlice';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(singleUser);
    console.log(user,"user")

    useEffect(() => {
        dispatch(fetchUserDetails()); 
    }, [dispatch]);

    if (!user) {
        return <div>Loading...</div>; 
    }
//todo : for trainer show list of courses and trainer details course detail with user enrolled course analysis course review
    // Calculate total spend
    const totalSpend = user?.courses.reduce((total, course) => {
        return total + course.trainerId.averagePricePerHour;
    }, 0);

    return (
        <div className="flex bg-gray-200 p-6">
            {/* Left Side: User Profile */}
            <div className="w-1/4 bg-white rounded-lg shadow-md p-4">
                <h2 className="text-center text-xl font-semibold">{user.name}</h2>
                <p className="text-center text-gray-600">{user.email}</p>
                <div className="mt-4">
                    <p className="font-semibold">Total Spend:</p>
                    <p className="text-lg text-orange-600">₹ {totalSpend.toFixed(2)}</p>
                </div>
                <div className="mt-4">
                    <p className="font-semibold">Membership Level:</p>
                    <p className="text-gray-600">Gold</p>
                </div>
                <div className="mt-4">
                    <p className="font-semibold">Joined On:</p>
                    <p className="text-gray-600">January 1, 2023</p>
                </div>
            </div>

            {/* Right Side: Enrolled Courses and Trainers */}
            <div className="w-3/4 ml-4 bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-bold text-orange-600 mb-4">Enrolled Courses</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {user.courses.length > 0 ? (
                        user.courses.map((course, index) => (
                            <div key={index} className="border rounded-lg shadow-sm p-4 bg-gray-50">
                                <img src={course.courseId.bannerUrl} alt={course.courseId.name} className="rounded-lg w-full h-32 object-cover mb-2" />
                                <h4 className="text-lg font-semibold">{course.courseId.name}</h4>
                                <p className="text-gray-500">Duration: {course.courseId.duration} minutes</p>
                                <p className="text-gray-500">Course Price: ₹ {course.trainerId.averagePricePerHour}</p>
                            </div>
                        ))
                    ) : (
                        <p>No courses enrolled yet.</p>
                    )}
                </div>

                <h3 className="text-lg font-bold text-orange-600 mb-4 mt-6">Trainers</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4'>
                    {user.courses.length > 0 ? (
                        user.courses.map((course, index) => (
                            <div key={index} className="flex items-center border-b py-4">
                                <div className='border rounded-lg shadow-sm p-4 bg-gray-50'>
                                    <img src="https://via.placeholder.com/50" alt="Trainer Avatar" className="rounded-full w-10 h-10 mr-2" /> {/* Replace with actual avatar URL */}
                                    <p className="font-semibold">{course.trainerId.name}</p>
                                    <p className="text-gray-500">{course.trainerId.email}</p>
                                    <p className="text-yellow-500">Rating: {course.trainerId.trainerRating}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No trainers available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
