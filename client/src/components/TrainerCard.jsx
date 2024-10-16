import React from 'react';
import { Link, useParams } from 'react-router-dom';

const TrainerCard = ({ trainers }) => {
  const { id } = useParams();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-lightGrey w-full">
      {trainers?.map((element) => (
        <div key={element._id} className="bg-white text-darkGrey p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="mb-4 flex items-center justify-center">
            <img
              src={element.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH87TKQrWcl19xly2VNs0CjBzy8eaKNM-ZpA&s'}
              alt={element.name}
              className="h-40 object-cover rounded-full"
            />
          </div>
          <h2 className="font-semibold text-lg mb-2">{element.name}</h2>
          <p className="text-sm mb-2">{element.trainerDescription}</p>
          <p className="text-sm mb-4">Rating: {element.trainerRating}</p>
          <p className="text-sm mb-4">Rate: ${element.perHourRate}/hr</p>
          <button className="bg-primary hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-200">
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