import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserState, registerUser, userSuccessMessage } from "../redux/slice/authenticationSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const successMessage = useSelector(userSuccessMessage);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User", 
    perHourRate: "",
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        dispatch(clearUserState());
        navigate("/login"); 
      }, 1000);
    }
  }, [successMessage, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      
      await dispatch(registerUser(formData)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-lightGrey flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-darkGrey mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-darkGrey">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-darkGrey rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

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

          <div>
            <label className="block text-darkGrey">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border border-darkGrey rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-darkGrey">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-darkGrey rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="User">User</option>
              
            </select>
          </div>

          {formData.role === "Trainer" && (
            <div>
              <label className="block text-darkGrey">Per Hour Rate</label>
              <input
                type="number"
                name="perHourRate"
                value={formData.perHourRate}
                onChange={handleChange}
                placeholder="Enter per hour rate"
                className="w-full px-4 py-2 border border-darkGrey rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required={formData.role === "Trainer"} 
              />
            </div>
          )}

          {loading && <p>Registering...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          
          <div>
            <button
              type="submit"
              className={`w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;