import React from 'react';
import { Link, useParams } from 'react-router-dom';

const TrainerCard = ({ trainers }) => {

   const {id}=useParams()

  return (
    <div className="flex flex-wrap gap-6 p-6 bg-primary w-full justify-center">
      {trainers?.map((element) => (
        <div key={element._id} className="bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 w-1/5">
          <div className="mb-4  flex items-center justify-center">
            <img
              src={element.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH87TKQrWcl19xly2VNs0CjBzy8eaKNM-ZpA&s'}
              alt={element.name}
              className=" h-40 object-cover rounded-full"
            />
          </div>
          <h2 className="font-semibold text-lg mb-2">{element.name}</h2>
          <p className="text-sm mb-2">{element.trainerDescription}</p>
          <p className="text-sm mb-4">Rating: {element.trainerRating}</p>
          <button className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded transition duration-200 hover:text-white">
            <Link to={`/course/${id}`}>
            Select Trainer
            </Link>
          </button>
        </div>
      ))}
    </div>
  );
};

export default TrainerCard;
