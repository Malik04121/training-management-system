// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchUsersByRole, trainerLists, userLists } from '../../redux/slice/authenticationSlice'
// import { categoryData, fetchCategory } from '../../redux/slice/categoriesSlice'

// const Dashboard = () => {
//     const users=useSelector(userLists)
//     const trainer=useSelector(trainerLists)
//     const categories=useSelector(categoryData)
//     const dispatch=useDispatch()

//     useEffect(()=>{
//        dispatch(fetchUsersByRole("User"))
//        dispatch(fetchUsersByRole("Trainer"))
//        dispatch(fetchCategory())
//     },[dispatch])
    
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">Dashboard Overview</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white p-4 shadow rounded">
//           <h2 className="text-xl font-semibold mb-2">Users</h2>
//           <ul>
//             {users.map(user => (
//               <li key={user.id} className="py-1 border-b">
//                 {user.name}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="bg-white p-4 shadow rounded">
//           <h2 className="text-xl font-semibold mb-2">Categories</h2>
//           <ul>
//             {categories.map((category, index) => (
//               <li key={index} className="py-1 border-b">
//                 {category.name}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="bg-white p-4 shadow rounded">
//           <h2 className="text-xl font-semibold mb-2">Trainers</h2>
//           <ul>
//             {trainer.map(user => (
                
//               <li key={user.id} className="py-1 border-b">
//                 {user.name}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* <div className="bg-white p-4 shadow rounded">
//           <h2 className="text-xl font-semibold mb-2">Trainers</h2>
//           <ul>
//             {trainers.map(trainer => (
//               <li key={trainer.id} className="py-1 border-b">
//                 {trainer.name}
//               </li>
//             ))}
//           </ul>
//         </div> */}

//         {/* <div className="bg-white p-4 shadow rounded col-span-1 md:col-span-3">
//           <h2 className="text-xl font-semibold mb-2">Total Courses</h2>
//           <p>{totalCourses}</p>
//         </div> */}
//       </div>
//     </div>
//   )
// }

// export default Dashboard





import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersByRole, trainerLists, userLists } from '../../redux/slice/authenticationSlice';
import { categoryData, fetchCategory } from '../../redux/slice/categoriesSlice';

// Import and register the required Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Import ArcElement for Pie charts
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { FaChalkboardTeacher, FaDollarSign, FaUser, FaWallet } from 'react-icons/fa';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const users = useSelector(userLists);
  const trainers = useSelector(trainerLists);
  
  const categories = useSelector(categoryData); // Correct reference here
  const dispatch = useDispatch();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [trainerEarnings, setTrainerEarnings] = useState({});
  const [userSpending, setUserSpending] = useState({});
  const [categoryDistribution, setCategoryDistribution] = useState({});

  useEffect(() => {
    dispatch(fetchUsersByRole('User'));
    dispatch(fetchUsersByRole('Trainer'));
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0 && trainers.length > 0 && categories.length > 0) {
      calculateMetrics(); // Call only when data is available
    }
  }, [users, trainers, categories]);

  // Calculate total revenue, trainer earnings, user spending, and category distribution
  const calculateMetrics = () => {
    let total = 0;
    const trainerEarningMap = {};
    const userSpendingMap = {};
    const categoryMap = {};

    users.forEach(user => {
      let userTotal = 0;
      user.courses.forEach(course => {
        if (course.trainerId && course.trainerId.averagePricePerHour) {
          const trainerId = course.trainerId._id;
          const courseCost = course.trainerId.averagePricePerHour;

          // Add to total revenue
          total += courseCost;

          // Add to trainer's earnings
          trainerEarningMap[trainerId] = (trainerEarningMap[trainerId] || 0) + courseCost;

          // Add to user spending
          userTotal += courseCost;

          // Track category distribution based on courses
          if (course.courseId && course.courseId.category) {
            const categoryId = course.courseId.category;
            categoryMap[categoryId] = (categoryMap[categoryId] || 0) + 1;
          }
        }
      });
      userSpendingMap[user._id] = userTotal;
    });

    // Update state only if values have changed
    if (total !== totalRevenue) setTotalRevenue(total);
    if (JSON.stringify(trainerEarnings) !== JSON.stringify(trainerEarningMap)) setTrainerEarnings(trainerEarningMap);
    if (JSON.stringify(userSpending) !== JSON.stringify(userSpendingMap)) setUserSpending(userSpendingMap);
    if (JSON.stringify(categoryDistribution) !== JSON.stringify(categoryMap)) setCategoryDistribution(categoryMap);
  };

  // Prepare data for the trainer earnings graph
  const trainerEarningsData = {
    labels: Object.keys(trainerEarnings).map(trainerId => {
      const trainer = trainers.find(t => t._id === trainerId);
      return trainer ? trainer.name : 'Unknown Trainer';
    }),
    datasets: [
      {
        label: 'Trainer Earnings',
        data: Object.values(trainerEarnings),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Prepare data for user spending pie chart
  const userSpendingData = {
    labels: Object.keys(userSpending).map(userId => {
      const user = users.find(u => u._id === userId);
      return user ? user.name : 'Unknown User';
    }),
    datasets: [
      {
        label: 'User Spending',
        data: Object.values(userSpending),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Prepare data for category distribution pie chart
  const categoryDataForChart = {
    labels: Object.keys(categoryDistribution).map(categoryId => {
      const category = categories.find(c => c._id === categoryId);
      return category ? category.name : 'Unknown Category';
    }),
    datasets: [
      {
        label: 'Categories',
        data: Object.values(categoryDistribution),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const stats = [
    { id: 1, title: "Total Users", count: users.length, icon: <FaUser size={24} />, color: "bg-purple-100", textColor: "text-purple-600" },
    { id: 2, title: "Total Trainers", count: trainers.length, icon: <FaChalkboardTeacher size={24} />, color: "bg-blue-100", textColor: "text-blue-600" },
    { id: 3, title: "Total Revenue", count: `₹ ${totalRevenue.toFixed(2)}`, icon: <FaDollarSign size={24} />, color: "bg-orange-100", textColor: "text-orange-600" },
    { id: 4, title: "Total Earnings", count: `₹ ${totalRevenue.toFixed(2)}`, icon: <FaWallet size={24} />, color: "bg-green-100", textColor: "text-green-600" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {stats.map((stat) => (
          <div key={stat.id} className={`p-6 rounded-lg shadow-lg bg-white flex items-center justify-between`}>
            <div className={`p-3 rounded-full ${stat.color}`}>
              <span className={`${stat.textColor}`}>{stat.icon}</span>
            </div>
            <div>
              <h3 className="text-3xl font-semibold">{stat.count}</h3>
              <p className="text-gray-500">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>
    
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* User Spending Pie Chart */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-lg font-bold mb-4">User Spending Distribution</h2>
          <Pie data={userSpendingData} />
        </div>

        {/* Trainer Earnings Bar Chart */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-lg font-bold mb-4">Trainer Earnings</h2>
          <Bar data={trainerEarningsData} />
        </div>

        {/* Category Distribution Pie Chart */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-lg font-bold mb-4">Category Distribution</h2>
          <Pie data={categoryDataForChart} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;