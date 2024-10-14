import React from 'react'

const TrainerList = (role) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        {role === "User" ? "Showing all Users" : "Showing all Trainers"}
      </h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {users?.map((user) => (
          <li key={user._id} className="border-b py-2">
            {user.name} - {user.email} - {user.role === "Trainer" && `Rating: ${user.trainerRating}`}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TrainerList
