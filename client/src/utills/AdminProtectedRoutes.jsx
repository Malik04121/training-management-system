import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);  
  const [loading, setLoading] = useState(true);
  const role=localStorage.getItem("role")

  useEffect(() => {
    
    if(role==="Admin"){
      setIsAdmin(true)
      setLoading(false)
    }
    

  }, []);

  // if (loading) {
  //   return <p>Loading...</p>;  
  // }

  
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  
  return children;
};

export default ProtectedRoute;