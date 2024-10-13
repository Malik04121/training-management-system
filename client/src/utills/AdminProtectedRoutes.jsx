import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);  // Initially null to show a loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check admin access by calling the backend
    axios.get('http://localhost:8500/auth/verify', { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          setIsAdmin(true);  // Admin access granted
        }
      })
      .catch(error => {
        setIsAdmin(false);  // No access or invalid token
      })
      .finally(() => {
        setLoading(false);  // Finish loading
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;  // Optional loading spinner or message
  }

  // If the user is not an admin, redirect to login
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  // If the user is an admin, render the protected page
  return children;
};

export default ProtectedRoute;