import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { clearUserState, loginUser, singleUser } from "../redux/slice/authenticationSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const  user=useSelector(singleUser)
  const role=localStorage.getItem("role")
  const loading = useSelector((state) => state.user.loading);
  const errorMessage = useSelector((state) => state.user.error);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   console.log(errorMessage,"errorMessage")
  //   if (errorMessage) {
  //     setTimeout(() => {
  //       dispatch(clearUserState());
  //     }, 3000);
  //   }
  // }, [errorMessage, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
    localStorage.setItem("isLogin",true)
    console.log(user,"userlist")

    // .then((response) => {
    //   if (response.payload) {
    //     console.log(response.payload,"payload")
    //     navigate("/"); 
    //   }
    // });
  };
  useEffect(()=>{
     console.log(user,"user")
     if(user && user.role==="Admin"){
             navigate("/dashboard")
          }
          if(user && (user.role==="User" || user.role==="Trainer")){
            navigate("/")
          }
  },[user])
  

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {loading && <p>Logging in...</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              Login
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default Login;