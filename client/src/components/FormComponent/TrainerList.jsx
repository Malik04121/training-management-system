import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { trainerLists } from '../../redux/slice/authenticationSlice'

const TrainerList = (role) => {
  const trainers=useSelector(trainerLists)
  const dispatch=useDispatch()





  return (
    <div className="p-6 bg-gray-50">
    <h1 className="text-3xl font-bold mb-6 text-gray-800">List of All Trainers</h1>
    {/* {moduleLoader && <p className="text-gray-600">Loading...</p>} */}
    {/* {moduleErrorMessage && <p className="text-red-500">{moduleErrorMessage}</p>} */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trainers?.map((trainer) => (
        <div key={trainer._id} className="bg-white shadow-lg rounded-lg p-4   items-start">
          <div className="flex-1 mr-4">
            <div className="mb-2">
              <span className="text-lg font-semibold text-gray-800">{trainer.name}</span>
            </div>
            <div className="text-gray-600 mb-1">
              <strong>Email:</strong> {trainer.email} 
            </div>
            <div className="text-gray-600 mb-4">
              <strong>Trainer Fees:</strong> {trainer.averagePricePerHour} /Hour
            </div>
          </div>
          <div className='flex align-middle justify-center m-auto'>

          
            {/* <MdDelete className='text-2xl text-red-600'onClick={() => deleteModuleHandler(module._id)} /> */}
            <button
              type="button"
              onClick={() => deleteTrainerHandler(trainer._id)}
              className="mt-auto hover:text-white text-red-600 bg-white w-full border border-red-600 hover:bg-red-600 rounded-lg font-bold py-2 "
              aria-label="Delete Course"
            >
              Remove Trainer
              {/* <MdDelete className='text-2xl' /> */}
            </button>
            </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default TrainerList
