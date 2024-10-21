import React, { useEffect, useState } from "react";
import Banner from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectError, selectLoading, singleUser, clearUserState } from "../../redux/slice/authenticationSlice";
import { categoryData, fetchCategory } from "../../redux/slice/categoriesSlice"; 
import { FaCaretDown } from "react-icons/fa"; 
import SearchFunctionality from "../FormComponent/SearchFunctionality";
import { clearState, fetchCourse } from "../../redux/slice/courseSlice";

const Header = () => {
  const userName = localStorage.getItem("username");
  const login = localStorage.getItem("isLogin");
  const userRole = localStorage.getItem("role");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const user = useSelector(singleUser); 
  const categories = useSelector(categoryData); 

  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    dispatch(fetchCategory()); 
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    await dispatch(clearUserState());
    // dispatch(clearState)

    window.location.reload("/login");
  };

  const handleUserIconClick = () => {
    if (userRole === "Admin") {
      navigate("/dashboard");
    } else {
      navigate("/userInfo"); 
    }
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleCategorySelect = (categoryId) => {

    dispatch(fetchCourse(categoryId));
    setShowCategories(false); 
    navigate(`/courses`); 
  };

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";

  const isDashboard = location.pathname === "/dashboard";
  const isRoot = location.pathname === "/";

  return (
    <header className="bg-darkGrey shadow-md p-5 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side: Logo, Categories, and Search */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link to="/">
            <img src={Banner} alt="Logo" className="h-10" />
          </Link>

          {/* Categories Icon */}
          <div className="relative">
            <button 
              onClick={toggleCategories} 
              className="text-white flex items-center space-x-2"
            >
              <span>Categories</span>
              <FaCaretDown className="text-lg" />
            </button>
            {showCategories && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg z-10">
                <ul className="py-2">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <li 
                        key={category.id} 
                        className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer" 
                        onClick={() => handleCategorySelect(category._id)}
                      >
                        {category.name}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500">No categories available</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex items-center w-96">
            <SearchFunctionality />
          </div>
        </div>

        {/* Right Side: About Us, User Info, Logout */}
        <div className="flex items-center space-x-4 gap-5">
          <div className="text-white text-xl hover:text-primary">
            <Link to="/about">About Us</Link>
          </div>

          {/* User Information */}
          { login ? (
            <>
             
              {userRole === "Admin" && (
                <Link
                  to={isDashboard ? "/" : "/dashboard"}
                  className="text-white hover:text-primary text-xl"
                >
                  {isRoot ? "Administrator" : "User Website"}
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-primary text-white px-4 py-2 rounded-full hover:bg-orange-600"
              >
                Logout
              </button>
              <div 
                className="bg-lightGrey text-black border border-white rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
                onClick={handleUserIconClick} 
              >
                {firstLetter}
              </div>

            </>
          ) : (
            <>
              <Link to={isDashboard ? "/" : "/dashboard"} className="text-white hover:text-primary text-xl">
                {isDashboard && "User Website" }
              </Link>
              <Link to="/login" className="text-white hover:text-primary cursor-pointer text-xl">
                Sign In
              </Link>
              <div className="border-l-2 border-gray-400 h-5 mx-3" />
              <Link to="/register" className="text-white px-4 py-2 rounded-full hover:text-primary text-xl">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
