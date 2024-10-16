import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersByRole, trainerLists, userLists } from '../../redux/slice/authenticationSlice'
import { categoryData, fetchCategory } from '../../redux/slice/categoriesSlice'

const Dashboard = () => {
    const users=useSelector(userLists)
    const trainer=useSelector(trainerLists)
    const categories=useSelector(categoryData)
    const dispatch=useDispatch()

    useEffect(()=>{
       dispatch(fetchUsersByRole("User"))
       dispatch(fetchUsersByRole("Trainer"))
       dispatch(fetchCategory())
    },[dispatch])
    
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <ul>
            {users.map(user => (
              <li key={user.id} className="py-1 border-b">
                {user.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <ul>
            {categories.map((category, index) => (
              <li key={index} className="py-1 border-b">
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Trainers</h2>
          <ul>
            {trainer.map(user => (
                
              <li key={user.id} className="py-1 border-b">
                {user.name}
              </li>
            ))}
          </ul>
        </div>

        {/* <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Trainers</h2>
          <ul>
            {trainers.map(trainer => (
              <li key={trainer.id} className="py-1 border-b">
                {trainer.name}
              </li>
            ))}
          </ul>
        </div> */}

        {/* <div className="bg-white p-4 shadow rounded col-span-1 md:col-span-3">
          <h2 className="text-xl font-semibold mb-2">Total Courses</h2>
          <p>{totalCourses}</p>
        </div> */}
      </div>
    </div>
  )
}

export default Dashboard
