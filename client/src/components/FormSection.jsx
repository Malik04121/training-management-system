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
  userList,
  selectLoading,
  selectError,
  clearUserState,
} from "../redux/slice/authenticationSlice";

const FormSection = ({ activeSection }) => {
  const dispatch = useDispatch();
  const categories = useSelector(categoryData);
  const categoryLoading = useSelector(loadingStatus);
  const categoryError = useSelector(errorMessage);
  const categorySuccess = useSelector(successMessage);

  const users = useSelector(userList);
  console.log(users,"users");
  
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");


  const [trainerData, setTrainerData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    averagePricePerHour: "",
    rating: "",
  });


  useEffect(() => {
    if (activeSection === "showCategory") {
      dispatch(fetchCategory());
    }
  }, [activeSection, dispatch]);


  useEffect(() => {
    if (activeSection === "showUsers") {
      dispatch(fetchUsersByRole("User"));
      console.log(user,"usesrlist in");
      
    } else if (activeSection === "showTrainers") {
      dispatch(fetchUsersByRole("Trainer"));
      console.log(users,"usesrlist in");

    }
  }, [activeSection, dispatch]);


  useEffect(() => {
    if (categorySuccess || categoryError || error) {
      setTimeout(() => {
        dispatch(clearMessages());
        dispatch(clearUserState());
      }, 3000);
    }
  }, [categorySuccess, categoryError, error, dispatch]);


  const handleCategory = (e) => {
    e.preventDefault();
    dispatch(
      addCategory({ name: categoryName, description: categoryDescription })
    );
    setCategoryName("");
    setCategoryDescription("");
  };


  const handleTrainerChange = (e) => {
    const { name, value } = e.target;
    setTrainerData({
      ...trainerData,
      [name]: value,
    });
  };


  const handleTrainer = (e) => {
    e.preventDefault();
    const {
      name,
      email,
      password,
      description: trainerDescription,
      averagePricePerHour,
      rating: trainerRating,
    } = trainerData;

    dispatch(
      addTrainer({
        name,
        email,
        password,
        trainerDescription,
        averagePricePerHour: Number(averagePricePerHour),
        trainerRating: Number(trainerRating),
      })
    );


    setTrainerData({
      name: "",
      email: "",
      password: "",
      description: "",
      averagePricePerHour: "",
      rating: "",
    });
  };


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
          <div>
            <h1 className="text-2xl font-semibold mb-4">
              Showing all Categories
            </h1>
            {categoryLoading && <p>Loading...</p>}
            {categoryError && <p className="text-red-500">{categoryError}</p>}
            <ul className="space-y-2">
              {categories?.map((category) => (
                <li key={category._id} className="border-b py-2">
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        );
      case "addCategory":
        return (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Add Category</h1>
            <form className="space-y-4" onSubmit={handleCategory}>
              <div>
                <label className="block text-gray-700">Category Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Category Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter category description"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                type="submit"
              >
                Save Category
              </button>
            </form>
          </div>
        );
      case "showUsers":
        return renderUserList("User");
      case "showTrainers":
        return renderUserList("Trainer");
      case "addTrainers":
        return (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Add Trainer</h1>
            <form className="space-y-4" onSubmit={handleTrainer}>
              <div>
                <label className="block text-gray-700">Trainer Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter trainer name"
                  name="name"
                  value={trainerData.name}
                  onChange={handleTrainerChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Trainer Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter trainer email"
                  name="email"
                  value={trainerData.email}
                  onChange={handleTrainerChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Trainer Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter trainer password"
                  name="password"
                  value={trainerData.password}
                  onChange={handleTrainerChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Trainer Description</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter trainer description"
                  name="description"
                  value={trainerData.description}
                  onChange={handleTrainerChange}
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700">
                  Average Price per Hour
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter price per hour"
                  name="averagePricePerHour"
                  value={trainerData.averagePricePerHour}
                  onChange={handleTrainerChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Trainer Rating</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter trainer rating"
                  name="rating"
                  value={trainerData.rating}
                  onChange={handleTrainerChange}
                  required
                />
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                type="submit"
              >
                Save Trainer
              </button>
            </form>
          </div>
        );
      default:
        return <h1 className="text-2xl font-semibold">Select an Option</h1>;
    }
  };

  return <div className="p-6">{renderContent()}</div>;
};

export default FormSection;