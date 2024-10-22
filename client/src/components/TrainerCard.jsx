import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addCourseToUser, fetchUserDetails, fetchUsersByRole, selectError, singleUser, userLists, verifyToken } from "../redux/slice/authenticationSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PaymentModal from "./PaymentModal";
import Rating from "./Rating";
import { trimText } from "../utills/textTrim";

const TrainerCard = ({ trainers }) => {
 
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
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

  // useEffect(async() => {
  //   await dispatch(fetchUserDetails());
  // }, [dispatch]);
  useEffect(() => {
    // Correct way to handle async operations in useEffect
    const fetchData = async () => {
      try {
        const response = await fetch('/your-api-endpoint');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup code here
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-6  w-full">
      {/* {error&& toast.error(error.message)} */}
      {trainers?.map((element) => (
        <div key={element._id} className="bg-gray-200 text-darkGrey p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col justify-between items-left h-[430px]">
          <div className=" flex items-center justify-center">
            <img
              src={element.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH87TKQrWcl19xly2VNs0CjBzy8eaKNM-ZpA&s'}
              alt={element.name}
              className="h-40 object-cover rounded-full"
            />
          </div>
          <h2 className="font-semibold text-lg  text-center">{element.name}</h2>
          {/* <p className="text-sm mb-2 h-40 ">{trimText(element.trainerDescription, 40)}</p> */}
          <div>


          <p className="text-sm line-clamp-3 ">{element.trainerDescription}</p>
          </div>
         <div className="flex">

          <p className="text-sm ">Rating:</p>
            <p> <Rating rating={element.trainerRating}/></p>
         </div>
          <p className="text-sm ">Rate: ₹ {element.averagePricePerHour} /hr</p>
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
