import React, { useEffect } from 'react'
import Header from '../components/Headers'
import HeaderBanner from '../components/HeaderBanner'
import Categories from '../components/HeadersCategory'
import CourseCard from '../components/CourseCardList'
import { useDispatch } from 'react-redux'
import { fetchCategory } from '../redux/slice/categoriesSlice'
import { fetchCourse } from '../redux/slice/courseSlice'

const Home = () => {
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(fetchCategory())
    dispatch(fetchCourse())
  },[dispatch])
  return (
    <>
    
    <HeaderBanner/>
    <div className='w-[80%] m-auto pb-10 mt-5'>
      <Categories/>
      <CourseCard/>
    </div>
    </>
  )
}

export default Home