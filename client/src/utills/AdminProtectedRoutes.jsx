// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import axios from 'axios';

// const ProtectedRoute = ({ children }) => {
//   const [isAdmin, setIsAdmin] = useState(null);  
//   const [loading, setLoading] = useState(true);
//   const role=localStorage.getItem("role")

//   useEffect(() => {
    
//     if(role==="Admin"){
//       setIsAdmin(true)
//       setLoading(false)
//     }
    

//   }, []);

//   // if (loading) {
//   //   return <p>Loading...</p>;  
//   // }

  
//   if (!isAdmin) {
//     return <Navigate to="/login" />;
//   }

  
//   return children;
// };

// export default ProtectedRoute;


import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, singleUser, verifyToken } from '../redux/slice/authenticationSlice';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(singleUser);
  const loading = useSelector(selectLoading);
  // const [loading]

  useEffect(() => {

    
    dispatch(verifyToken());

  }, [dispatch]);

  

  if (user && user.role !== "Admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;