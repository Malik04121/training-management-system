import React from 'react'
import Header from '../components/Headers'
import HeaderBanner from '../components/HeaderBanner'
import Categories from '../components/HeadersCategory'
import CourseCard from '../components/CourseList'

const Home = () => {
  return (
    <>
    <HeaderBanner/>
    <div>
      <Categories/>
      <CourseCard/>
    </div>
    </>
  )
}

export default Home