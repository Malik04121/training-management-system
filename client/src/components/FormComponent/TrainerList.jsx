import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trainerLists, fetchUsersByRole, deleteUser } from '../../redux/slice/authenticationSlice';
import Pagination from '../PaginationComponent';
import { toast } from 'react-toastify';

const TrainerList = () => {
  const trainers = useSelector(trainerLists);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const role = 'Trainer';
  const [localTrainers, setLocalTrainers] = useState(trainers);

  const deleteTrainerHandler = async (id) => {
    const result = await dispatch(deleteUser(id));
    if (result.meta.requestStatus === 'fulfilled') {
      setLocalTrainers(localTrainers.filter(trainer => trainer._id !== id));
      toast.success("Trainer Deleted successfully!");
    } else {
      toast.error("Failed to delete trainer.");
    }
  };

  useEffect(() => {
    const fetchPaginatedTrainers = async () => {
      const result = await dispatch(fetchUsersByRole({ role, page: currentPage, limit: 6 }));
      if (result.meta.requestStatus === 'fulfilled') {
        const { totalPages } = result.payload;
        setTotalPages(totalPages);
        setLocalTrainers(result.payload.data);
      }
    };
    fetchPaginatedTrainers();
  }, [dispatch, currentPage, role]);

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">List of All Trainers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {localTrainers?.map((trainer) => (
          <div key={trainer._id} className="bg-white shadow-lg rounded-lg p-4 items-start">
            <div className="flex-1 mr-4">
              <div className="mb-2">
                <span className="text-lg font-semibold text-gray-800">{trainer.name}</span>
              </div>
              <div className="text-gray-600 mb-1">
                <strong>Email:</strong> {trainer.email}
              </div>
              <div className="text-gray-600 mb-4">
                <strong>Trainer Fees:</strong> ₹ {trainer.averagePricePerHour} /Hour
              </div>
            </div>
            <div className='flex align-middle justify-center m-auto'>
              <button
                type="button"
                onClick={() => deleteTrainerHandler(trainer._id)}
                className="mt-auto hover:text-white text-red-600 bg-white w-full border border-red-600 hover:bg-red-600 rounded-lg font-bold py-2"
                aria-label="Delete Trainer"
              >
                Remove Trainer
              </button>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default TrainerList;
