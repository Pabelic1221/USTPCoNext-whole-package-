import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    // If user is not logged in, redirect to login
    return <Navigate to="/sign-in" />;
  }

  if (!allowedRoles.includes(user.role)) {
    // If user does not have the required role, redirect to a general page or show an error
    return <Navigate to="/unauthorized" />;
  }

  // If user is authenticated and has the required role, render the children
  return children;
};

export default ProtectedRoute;
