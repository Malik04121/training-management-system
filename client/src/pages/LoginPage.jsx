import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserState, fetchUserDetails, loginUser, singleUser } from "../redux/slice/authenticationSlice";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const user = useSelector(singleUser);
  const role = localStorage.getItem("role");
  const loading = useSelector((state) => state.user.loading);
  const errorMessage = useSelector((state) => state.user.error);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        dispatch(clearUserState());
      }, 3000);
    }
  }, [errorMessage, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(formData)).unwrap();
      localStorage.setItem("isLogin", true);
      toast.success("Login successful! Welcome back!")
      // await dispatch(fetchUserDetails())
      navigate("/"); 
    } catch (error) {
      toast.error(error)
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-lightGrey flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-darkGrey mb-6 text-center">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-darkGrey">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-darkGrey rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-darkGrey">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-darkGrey rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}

          <div>
            <button
              type="submit"
              className={`w-full hover:bg-primary hover:text-white px-4 py-2 rounded-lg bg-white text-primary border border-primary font-bold transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;