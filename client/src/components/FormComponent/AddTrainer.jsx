import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTrainer } from '../../redux/slice/authenticationSlice';

const AddTrainer = () => {
  const dispatch = useDispatch();

    const [trainerData, setTrainerData] = useState({
        name: "",
        email: "",
        password: "",
        description: "",
        averagePricePerHour: "",
        rating: "",
      });
    const handleTrainerChange = (e) => {
        const { name, value } = e.target;
        setTrainerData({
          ...trainerData,
          [name]: value,
        });
      };
    
    
      const handleTrainer = (e) => {
        e.preventDefault();
        const {
          name,
          email,
          password,
          description: trainerDescription,
          averagePricePerHour,
          rating: trainerRating,
        } = trainerData;
    
        dispatch(
          addTrainer({
            name,
            email,
            password,
            trainerDescription,
            averagePricePerHour: Number(averagePricePerHour),
            trainerRating: Number(trainerRating),
          })
        );
    
    
        setTrainerData({
          name: "",
          email: "",
          password: "",
          description: "",
          averagePricePerHour: "",
          rating: "",
        });
      };
  return (
    <div>
            <h1 className="text-2xl font-semibold mb-4">Add Trainer</h1>
            <form className="space-y-4" onSubmit={handleTrainer}>
              <div>
                <label className="block text-gray-700">Trainer Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter trainer name"
                  name="name"
                  value={trainerData.name}
                  onChange={handleTrainerChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Trainer Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter trainer email"
                  name="email"
                  value={trainerData.email}
                  onChange={handleTrainerChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Trainer Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter trainer password"
                  name="password"
                  value={trainerData.password}
                  onChange={handleTrainerChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Trainer Description</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter trainer description"
                  name="description"
                  value={trainerData.description}
                  onChange={handleTrainerChange}
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700">
                  Average Price per Hour
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter price per hour"
                  name="averagePricePerHour"
                  value={trainerData.averagePricePerHour}
                  onChange={handleTrainerChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Trainer Rating</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter trainer rating"
                  name="rating"
                  value={trainerData.rating}
                  onChange={handleTrainerChange}
                  required
                />
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                type="submit"
              >
                Save Trainer
              </button>
            </form>
          </div>
  )
}

export default AddTrainer
