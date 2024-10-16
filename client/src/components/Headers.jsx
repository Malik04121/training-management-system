import React, { useEffect, useState } from "react";
import Banner from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectError, selectLoading, verifyToken, singleUser, clearUserState } from "../redux/slice/authenticationSlice";
import { MdSearch } from "react-icons/md";
import SearchFunctionality from "./FormComponent/SearchFunctionality";

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

  const handleLogout = async() => {
    await dispatch(logoutUser());
    await dispatch(clearUserState());
    navigate("/login");
  };

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";

  const isDashboard = location.pathname === "/dashboard";
  const isRoot = location.pathname === "/";

  return (
    <header className="bg-darkGrey shadow-md p-5 sticky top-0 z-1000">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center space-x-4">
            <img src={Banner} alt="Logo" className="h-10" />
          </div>
        </Link>

        {/* Search Functionality */}
        <div className="flex items-center w-96">
          <SearchFunctionality />
        </div>

        {/* User Information */}
        <div className="space-x-4 flex items-center">
          { login ? (
            <>
              <div className="bg-lightGrey text-black border border-white rounded-full h-10 w-10 flex items-center justify-center">
                {firstLetter}
              </div>

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
            </>
          ) : (
            <>
              <Link to={isDashboard ? "/" : "/dashboard"} className="text-white hover:text-primary text-xl">
                {isDashboard && "User Website" }
              </Link>
              <Link to="/login" className="text-white hover:text-blue-500 cursor-pointer">
                Sign In
              </Link>
              <div className="border-l-2 border-gray-400 h-5 mx-4" />
              <Link to="/register" className="text-white px-4 py-2 rounded-full hover:text-blue-700">
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