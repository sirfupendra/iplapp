// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // If no token, redirect to the login page
    if (!token) {
        return <Navigate to="/login" />;
    }

    // If authenticated, render the children (protected component)
    return children;
};

export default PrivateRoute;
