import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  categoryData,
  clearMessages,
  errorMessage,
  fetchCategory,
  loadingStatus,
  successMessage,
} from "../redux/slice/categoriesSlice";
import {
  addTrainer,
  fetchUsersByRole,
  selectLoading,
  selectError,
  clearUserState,
  userLists,
} from "../redux/slice/authenticationSlice";
import { fetchModule } from "../redux/slice/moduleSlice";
import CategoryList from "./FormComponent/CategoryList";
import AddCategory from "./FormComponent/AddCategory";
import TrainingModuleList from "./FormComponent/TrainingModuleList";
import AddModule from "./FormComponent/AddModule";
import AddTrainer from "./FormComponent/AddTrainer";
import AddCourses from "./FormComponent/AddCourses";
import CourseList from "./FormComponent/CourseList";
import { fetchCourse } from "../redux/slice/courseSlice";

const FormSection = ({ activeSection }) => {
  const dispatch = useDispatch();
 
  // const categorySuccess = useSelector(successMessage);

  const users = useSelector(userLists);
  console.log(users,"users");
  
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);



  useEffect(() => {
    if (activeSection === "showCategory") {
      dispatch(fetchCategory());
    }
    if(activeSection==="showModule"){
      dispatch(fetchModule())
    }
    if(activeSection==="addCourses"){
      dispatch(fetchUsersByRole("Trainer"))
      dispatch(fetchCategory())
      dispatch(fetchModule())
    }
    if(activeSection==="showCourses"){
      dispatch(fetchCourse())
    }
  }, [activeSection, dispatch]);

  useEffect(()=>{
      if(activeSection==="addModule"){
        dispatch(fetchCategory())
      }
  },[activeSection,dispatch])

  useEffect(() => {
    if (activeSection === "showUsers") {
      dispatch(fetchUsersByRole("User"));
      
    } else if (activeSection === "showTrainers") {
      dispatch(fetchUsersByRole("Trainer"));
    }
  }, [activeSection, dispatch]);


  // useEffect(() => {
  //   if (categorySuccess || error) {
  //     setTimeout(() => {
  //       dispatch(clearMessages());
  //       dispatch(clearUserState());
  //     }, 3000);
  //   }
  // }, [categorySuccess, error, dispatch]);

 


  const renderUserList = (role) => (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        {role === "User" ? "Showing all Users" : "Showing all Trainers"}
      </h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {users?.map((user) => (
          <li key={user._id} className="border-b py-2">
            {user.name} - {user.email} - {user.role === "Trainer" && `Rating: ${user.trainerRating}`}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <h1 className="text-2xl font-semibold">Dashboard Overview</h1>;
      case "showCategory":
        return (
         <CategoryList/>
        );
      case "addCategory":
        return (
          <AddCategory/>
        );
      case "showModule":
        return(
           <TrainingModuleList/>
        );
      case "addModule":
          return (
            <AddModule/>
          );

      case "showCourses":
          return(
        <CourseList/>
          )
       case "addCourses":
        return (<AddCourses/>)
      case "showUsers":
        return (renderUserList("User"));
      case "showTrainers":
        return renderUserList("Trainer");
      case "addTrainers":
        return (
         <AddTrainer/>
        );
      default:
        return <h1 className="text-2xl font-semibold">Select an Option</h1>;
    }
  };

  return <div className="p-6">{renderContent()}</div>;
};

export default FormSection;