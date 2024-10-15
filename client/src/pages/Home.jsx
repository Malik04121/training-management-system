import React, { useEffect } from 'react'
import Header from '../components/Headers'
import HeaderBanner from '../components/HeaderBanner'
import Categories from '../components/HeadersCategory'
import CourseCard from '../components/CourseList'
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
    {/* <Header/> */}
    <HeaderBanner/>
    <div className='w-[70%] m-auto'>

      <Categories/>
      <CourseCard/>
    </div>
    </>
  )
}

export default Home