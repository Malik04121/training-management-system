import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleCourse, singleCourseData } from '../redux/slice/courseSlice';
import TrainerCard from '../components/TrainerCard';
import { useParams } from 'react-router-dom';
import { Range, getTrackBackground } from 'react-range';

const Trainer = () => {
  const dispatch = useDispatch();
  const singleCourse = useSelector(singleCourseData);
  const { id } = useParams();

  const STEP = 1;
  const MIN = 10;  // Minimum rate
  const MAX = 10000; // Maximum rate

  // State for the range filter
  const [values, setValues] = useState([MIN, MAX]); // Min and max range state
  const [rating, setRating] = useState(0); // Start with minimum rating 0

  useEffect(() => {
    dispatch(fetchSingleCourse(id));
  }, [dispatch, id]);

  // Filter trainers based on the filter criteria
  const filteredTrainers = singleCourse.trainers?.filter(trainer => {
    const meetsRateCriteria = (trainer.averagePricePerHour >= values[0]) && 
                              (trainer.averagePricePerHour <= values[1]);
    const meetsRatingCriteria = (trainer.trainerRating >= rating);
    return meetsRateCriteria && meetsRatingCriteria;
  });

  return (
    <div className='flex'>
      <div className='w-[30%] p-4 bg-lightGrey'>
        {/* Filter Section */}
        <h2 className='text-lg font-semibold mb-4 text-darkGrey'>Filter Trainers</h2>
        
        <div className='mb-4'>
          <label className='block text-sm font-medium text-darkGrey'>Hourly Rate: ${values[0]} - ${values[1]}</label>
          
          {/* Range Slider */}
          <Range
            values={values}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={(values) => setValues(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '6px',
                  width: '100%',
                  background: getTrackBackground({
                    values,
                    colors: ['#ccc', '#FF6D2C', '#ccc'],  // Primary orange for the active track
                    min: MIN,
                    max: MAX
                  })
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '20px',
                  width: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#FFF',
                  border: '1px solid #FF6D2C',  // Primary orange border
                  boxShadow: '0px 2px 6px #AAA'
                }}
              />
            )}
          />
          
          <div className="flex justify-between mt-2 text-darkGrey">
            <span>Min: ${values[0]}</span>
            <span>Max: ${values[1]}</span>
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-darkGrey'>Minimum Rating</label>
          <input
            type='number'
            min="0"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className='w-full px-3 py-2 border border-darkGrey rounded'
            placeholder='Enter min rating'
          />
        </div>
      </div>

      <div className='w-[70%] p-4'>
        <TrainerCard trainers={filteredTrainers} />
      </div>
    </div>
  );
}

export default Trainer;