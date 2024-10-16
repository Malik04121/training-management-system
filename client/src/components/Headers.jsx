import React, { useEffect, useState } from "react";
import Banner from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectError, selectLoading, verifyToken, singleUser, role, username } from "../redux/slice/authenticationSlice";
import { MdSearch } from "react-icons/md";
import SearchFunctionality from "./FormComponent/SearchFunctionality";

const Header = () => {
  const userRole=useSelector(role)
  const userName=useSelector(username)
  const login=localStorage.getItem("isLogin")

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location=useLocation()
  
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const user = useSelector(singleUser); 

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("isLogin")
    dispatch(logoutUser());
    // setRole(null); 
    // setUsername(null); 
    navigate("/login");
  };

  useEffect(()=>{
    if(!login){
      dispatch(verifyToken()); 
    }  
  },[login])
 

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";
  const isDashboard = location.pathname === "/dashboard";

  return (
      <header className="bg-gradient-to-br from-gray-500 via-randomColor-200 to-randomColor-100 shadow-md p-5 sticky top-0">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <div className="flex items-center space-x-4">
              <img src={Banner} alt="Logo" className="h-10" />
            </div>
          </Link>
  
          <div className="flex items-center w-96">
           <SearchFunctionality/>
          </div>
  
          <div className="space-x-4 flex items-center">
            
            { login ? (
              <>
                <div className="bg-gray-800 text-white border border-white rounded-full h-10 w-10 flex items-center justify-center">
                  {firstLetter}
                </div>
  
                <Link to={isDashboard ? "/" : "/dashboard"} className="text-white hover:text-orange-500 text-xl">
                {isDashboard && "User Website" }
              </Link>
  
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:text-orange-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
               
                <Link to={isDashboard ? "/" : "/dashboard"} className="text-white hover:text-orange-500 text-xl">
                {isDashboard && "User Website" }
              </Link>
                <Link to="/login" className="text-white hover:text-blue-500 cursor-pointer">
                  Sign In
                </Link>
                <div className="border-l-2 border-gray-400 h-5 mx-4" /> 
                <Link to="/register" className=" text-white px-4 py-2 rounded-full hover:text-blue-700">
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