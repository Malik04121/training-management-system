import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, selectLoading, singleUser } from '../redux/slice/authenticationSlice';
import { clearState } from '../redux/slice/courseSlice';
import { Link, useNavigate } from 'react-router-dom';
import convertDate from '../utills/DateConversion';
import UserProfileSkeleton from '../components/Skeleton/UserProfileSkeleton';
import Rating from '../components/Rating';
import calculateRemainingTime from '../utills/calculateRemainingtime';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(singleUser);
    const loading = useSelector(selectLoading);
    const navigate=useNavigate()

    const getStatus = (course) => {
        const startDate = new Date(course?.courseId.courseStartDate);
        
        const endDate = new Date(startDate.getTime() + course.courseId.duration * 60 * 60 * 1000); 
        const currentDate = new Date();

        if (currentDate < startDate) return 'Not Started';
        if (currentDate >= startDate && currentDate <= endDate) return 'Started';
        return 'Completed';
    };

    const clickHandler = (course) => {
        const status = getStatus(course);
        if (status === 'Started') {
            navigate(`/course/${course.courseId._id}`);
        }
    };
   
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            await dispatch(fetchUserDetails());
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
        return () => {
        };
      }, []);

    if (loading) {
        return <UserProfileSkeleton/>; 
    }
    
    const totalSpend = user?.courses?.length > 0 
    ? user.courses.reduce((total, course) => {
        return total + (course.trainerId?.averagePricePerHour || 0);
    }, 0)
    : 0;
    return (
        <div className="flex bg-gray-200 p-4">
            
            <div className="w-1/4 bg-white rounded-lg shadow-md p-8">
            <div className=' flex text-center justify-center'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH87TKQrWcl19xly2VNs0CjBzy8eaKNM-ZpA&s" alt="User Avatar" className="rounded-full w-24 h-24 mr-2 border border-primary border-2" /> 
            </div>
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
                    <p className="text-gray-600">{convertDate(user.createdAt)}</p>
                </div>
            </div>

           
            <div className="w-3/4 ml-4 bg-white rounded-lg shadow-md p-8">
                <h3 className="text-lg font-bold text-orange-600 mb-4">Enrolled Courses</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                   
                        {user?.courses?.length > 0 ? (
        user?.courses?.map((course, index) => (
            course.courseId ? (
                <div key={index} className="border rounded-lg shadow-sm p-4 bg-gray-100  cursor-pointer hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out" onClick={()=>clickHandler(course)}>
                    <img src={course.courseId.bannerUrl || "https://via.placeholder.com/150"} alt={course.courseId.name} className="rounded-lg w-full h-32 object-cover mb-2" />
                    <h4 className="text-lg font-semibold">{course.courseId.name}</h4>
                    <p className="text-gray-500"><span className='font-semibold text-black'>Duration:</span> {course.courseId.duration} hour</p>
                    <p className="text-gray-500"><span className='font-semibold text-black'>Course Price: </span> ₹ {course.trainerId.averagePricePerHour}</p>
                    <p className="text-gray-500"><span className='font-semibold text-black'>Course Start Date:</span>  {course.enrollmentDate?convertDate(course.courseId.courseStartDate):""}</p>
                    <p className="text-gray-500"><span className='font-semibold text-black'>Course will End In:</span> {calculateRemainingTime({startDate:course.courseId.courseStartDate,duration:course.courseId.duration})===0?"Already Completed":(calculateRemainingTime({startDate:course.courseId.courseStartDate,duration:course.courseId.duration}))+" hour"} </p>
                   
                    <div className="mt-4">
                        <button
                            className={`px-4 py-2  text-white font-semibold ${
                                getStatus(course)=== 'Started'
                                    ? 'bg-green-500'
                                    : getStatus(course) === 'Not Started'
                                    ? 'bg-orange-500'
                                    : 'bg-gray-500'
                            }`}
                            disabled={getStatus(course) !== 'Started'}
                        >
                            {getStatus(course)}
                        </button>
                    </div>
                </div>
            ) : (
                <div key={index} className="border rounded-lg shadow-sm p-4 bg-gray-50">
                    <p>Course details not available.</p>
                </div>
            )
        ))
    ) : (
        <p>No courses enrolled yet.</p>
    )}
                </div>

                <h3 className="text-lg font-bold text-orange-600  mt-10">Trainers</h3>
                <div className='flex  md:grid-cols-5 flex-wrap  gap-5 justify-center'>
                    {user?.courses?.length > 0 ? (
                        user.courses.map((course, index) => (
                            <div key={index} className="flex items-center border-b py-4  w-[22%] ">
                                <div className='border rounded-lg shadow-sm p-4 bg-gray-100 w-full'>
                                    <div className='flex justify-center'>

                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH87TKQrWcl19xly2VNs0CjBzy8eaKNM-ZpA&s" alt="Trainer Avatar" className="rounded-full w-14 h-14 mr-2" /> 
                                    </div>
                                    <p className="font-semibold">{course.trainerId.name}</p>
                                    <p className="text-gray-500">{course.trainerId.email}</p>
                                    <p className="text-black flex align-middle text-center">Rating: <p><Rating rating={course.trainerId.trainerRating}/></p></p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='bg-red-500'>No trainers available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
