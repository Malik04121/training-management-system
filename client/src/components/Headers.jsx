import React, { useEffect, useState } from "react";
import Banner from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectError, selectLoading, verifyToken, singleUser } from "../redux/slice/authenticationSlice";

const Header = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get loading, error, and user state from Redux
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const user = useSelector(singleUser); // Get user details from Redux

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setRole(null); // Clear role in local state
    setUsername(null); // Clear username in local state
    navigate("/login");
  };

  // When user logs in or page loads, verify token and update state
  useEffect(() => {
    if (!role || !username) {
      dispatch(verifyToken()).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          const { role, username } = result.payload;
          setRole(role);
          setUsername(username);
        } else {
          handleLogout();
        }
      });
    }
  }, [dispatch, role, username]);

  // Extract first letter of username for circular avatar
  const firstLetter = username ? username.charAt(0).toUpperCase() : "";

  return (
    <header className="bg-blue-700 shadow-md p-5">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center space-x-4">
            <img src={Banner} alt="Logo" className="h-10" />
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex items-center w-96">
          <div className="flex items-center space-x-2 w-full">
            <input
              type="text"
              placeholder="Search For Courses"
              className="px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-blue-300 w-full"
            />
            <button className="text-gray-600 hover:text-blue-500">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        {/* User Interaction Section */}
        <div className="space-x-4 flex items-center">
          {loading ? (
            <span className="text-white">Loading...</span>
          ) : role && username ? (
            <>
              {/* Circular Avatar with Initial */}
              <div className="bg-gray-800 text-white rounded-full h-10 w-10 flex items-center justify-center">
                {firstLetter}
              </div>

              {/* Show Main Website or Administrator based on role */}
              {role === "Admin" ? (
                <Link to="/main" className="text-white hover:text-orange-500 text-xl">
                  Main Website
                </Link>
              ) : (
                <Link to="/dashboard" className="text-white hover:text-orange-500 text-xl">
                  Administrator
                </Link>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:text-orange-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Show Login and Sign Up buttons when not logged in */}
              <Link to="/login" className="text-gray-600 hover:text-blue-500 cursor-pointer">
                Log In
              </Link>
              <Link to="/register" className="bg-red-500 text-white px-4 py-2 rounded-full hover:text-orange-500">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;