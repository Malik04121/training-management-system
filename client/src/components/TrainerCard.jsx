import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addCourseToUser, fetchUserDetails, fetchUsersByRole, selectError, singleUser, userLists, verifyToken } from "../redux/slice/authenticationSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PaymentModal from "./PaymentModal";
import Rating from "./Rating";

const TrainerCard = ({ trainers }) => {
  // const { id } = useParams(); 
  // const dispatch = useDispatch();
  // const user = useSelector(userLists); 
  // const role=localStorage.getItem("role")
  // const loginUser = useSelector(singleUser); 
  // const error=useSelector(selectError)

  // const handleChooseTrainer = async(trainerId) => {
  //   if (loginUser) {
  //     dispatch(addCourseToUser({ userId: loginUser.userId, courseId: id, trainerId }))
       
  //   } else {
  //     toast.warn('Please log in to choose a trainer.'); 
  //   }
  // };
  // useEffect(()=>{
  //   dispatch(fetchUserDetails())
  // },[dispatch])
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation
  const loginUser = useSelector(singleUser); 
  const error = useSelector(selectError);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);

  const handleChooseTrainer = (trainerId, perHourRate) => {
    if (loginUser) {
      setAmount(perHourRate);
      setSelectedTrainerId(trainerId);
      setModalOpen(true);
    } else {
      toast.warn('Please log in to choose a trainer.'); 
    }
  };

  const handleConfirmPayment = async () => {
    try {
      await dispatch(addCourseToUser({ userId: loginUser.userId, courseId: id, trainerId: selectedTrainerId })).unwrap();
      toast.success('Course added successfully!');
      setModalOpen(false);
      navigate(`/course/${id}`)
    } catch (err) {
      toast.error(err.message);
      setModalOpen(false)
    }
  };

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-6  w-full">
      {/* {error&& toast.error(error.message)} */}
      {trainers?.map((element) => (
        <div key={element._id} className="bg-gray-200 text-darkGrey p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="mb-4 flex items-center justify-center">
            <img
              src={element.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH87TKQrWcl19xly2VNs0CjBzy8eaKNM-ZpA&s'}
              alt={element.name}
              className="h-40 object-cover rounded-full"
            />
          </div>
          <h2 className="font-semibold text-lg mb-2">{element.name}</h2>
          <p className="text-sm mb-2 h-40">{element.trainerDescription}</p>
         <div className="flex">

          <p className="text-sm mb-4">Rating:</p>
            <p> <Rating rating={element.trainerRating}/></p>
         </div>
          <p className="text-sm mb-4">Rate: ₹ {element.averagePricePerHour} /hr</p>
          <button 
              className="bg-white hover:bg-orange-600 hover:text-white border border-primary text-primary font-bold py-2 px-4 rounded transition duration-200 w-full"
              onClick={() => handleChooseTrainer(element._id, element.averagePricePerHour)} 
            >
              Choose Trainer
            </button>
        </div>
        
      ))}
      <PaymentModal 
        isOpen={modalOpen} 
        onRequestClose={() => setModalOpen(false)} 
        amount={amount} 
        onConfirm={handleConfirmPayment} 
      />
    </div>
  );
};

export default TrainerCard;
