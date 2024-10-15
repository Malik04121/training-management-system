import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { courseData, fetchCourse, fetchSingleCourse, singleCourseData } from '../redux/slice/courseSlice'
import TrainerCard from '../components/TrainerCard'
import { useParams } from 'react-router-dom'

const Trainer = () => {
   const dispatch=useDispatch()
   const singleCourse=useSelector(singleCourseData)

   const {id}=useParams()
   useEffect(()=>{
       dispatch(fetchSingleCourse(id))
    },[dispatch])

return (
  <div className='flex'>
      
      {/* <div className='w-[30%]'>
         filter
      </div> */}
      <div className='bg-orange-500'>
              <TrainerCard trainers={singleCourse.trainers}/>
      </div>
  </div>
)
}

export default Trainer
