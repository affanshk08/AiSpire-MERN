import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminRoute = () => {
  const { user } = useContext(AuthContext);

  // Show loading or some placeholder while user is being determined
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  // If user is determined and is not an admin, redirect
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }
  
  // If user is an admin, render the child routes
  return <Outlet />;
};

export default AdminRoute;