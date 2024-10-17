import React, { useEffect } from 'react'
import Curriculum from '../components/Curiculum'
import { useDispatch, useSelector } from 'react-redux'
import { moduleData } from '../redux/slice/moduleSlice'

const SingleCourse = () => {
  const module=useSelector(moduleData)

  return (
    <div>
      <Curriculum/>
    </div>
  )
}

export default SingleCourse
