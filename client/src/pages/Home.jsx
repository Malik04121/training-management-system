// import React, { useEffect } from 'react'
// import Header from '../components/Headers'
// import HeaderBanner from '../components/HeaderBanner'
// import Categories from '../components/HeadersCategory'
// import CourseCard from '../components/CourseCardList'
// import { useDispatch } from 'react-redux'
// import { fetchCategory } from '../redux/slice/categoriesSlice'
// import { fetchCourse } from '../redux/slice/courseSlice'

// const Home = () => {
//   const dispatch=useDispatch()

//   useEffect(()=>{
//     dispatch(fetchCategory())
//     dispatch(fetchCourse())
//   },[dispatch])
//   return (
//     <>
    
//     <HeaderBanner/>
//     <div className='w-[80%] m-auto pb-10 mt-5'>
//       <Categories/>
//       <CourseCard/>
//     </div>
//     </>
//   )
// }

// export default Home

// import React, { useEffect, useState } from 'react';
// import Header from '../components/Headers';
// import HeaderBanner from '../components/HeaderBanner';
// import Categories from '../components/HeadersCategory';
// import CourseCard from '../components/CourseCardList';
// import { useDispatch } from 'react-redux';
// import { fetchCategory } from '../redux/slice/categoriesSlice';
// import { fetchCourse } from '../redux/slice/courseSlice';

// const Home = () => {
//   const dispatch = useDispatch();
//   const [selectedCategory, setSelectedCategory] = useState(null); // New state for selected category

//   useEffect(() => {
//     dispatch(fetchCategory());
//     dispatch(fetchCourse());
//   }, [dispatch]);

//   return (
//     <>
//       <HeaderBanner />
//       <div className='w-[80%] m-auto pb-10 mt-5'>
//         <Categories setSelectedCategory={setSelectedCategory} /> {/* Pass the setter to Categories */}
//         <CourseCard selectedCategory={selectedCategory} /> {/* Pass the selected category to CourseCard */}
//       </div>
//     </>
//   );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import HeaderBanner from '../components/HeaderBanner';
import Categories from '../components/HeadersCategory';
import CourseCard from '../components/CourseCardList';
import { useDispatch } from 'react-redux';
import { fetchCategory } from '../redux/slice/categoriesSlice';
import { fetchCourse } from '../redux/slice/courseSlice';

const Home = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null); // New state for selected category

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchCourse());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchCourse(selectedCategory._id)); // Fetch courses based on selected category
    }
  }, [selectedCategory, dispatch]); // Fetch courses when selectedCategory changes

  return (
    <>
      <HeaderBanner />
      <div className='w-[80%] m-auto pb-10 mt-5'>
        <Categories setSelectedCategory={setSelectedCategory} /> {/* Pass the setter to Categories */}
        <CourseCard selectedCategory={selectedCategory} /> {/* Pass the selected category to CourseCard */}
      </div>
    </>
  );
};

export default Home;

