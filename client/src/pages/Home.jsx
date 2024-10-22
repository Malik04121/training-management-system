
import React, { useEffect, useState } from 'react';
import HeaderBanner from '../components/HeaderBanner';
import Categories from '../components/HeadersCategory';
import CourseCard from '../components/CourseCardList';
import { useDispatch } from 'react-redux';
import { fetchCategory } from '../redux/slice/categoriesSlice';
import { fetchCourse } from '../redux/slice/courseSlice';

const Home = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null); 

  // useEffect(() => {
  //   if (selectedCategory) {
  //     dispatch(fetchCourse(selectedCategory._id)); 
  //   }
  // }, [selectedCategory]);

  return (
    <>
      <HeaderBanner />
      <section className='bg-gray-100  pt-5'>
<div className='flex text-center justify-center'>

      <h3 className='text-2xl font-bold '>Explore Our Program</h3>
</div>
      <div className=' flex w-[80%] items-start m-auto pb-10 mt-5 relative'>
        <Categories setSelectedCategory={setSelectedCategory} /> 
        <CourseCard selectedCategory={selectedCategory} /> 
      </div>
    
      </section>
    </>
  );
};

export default Home;

