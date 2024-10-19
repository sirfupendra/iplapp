
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

function PrivateRoute({ protect, redirectPath = '/' }) {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>; 

    if (protect && !user) {
        // If the route is protected and no user is logged in, redirect to login.
        return <Navigate to="/login" />;
    }

    if (!protect && user) {
        // If the route is public (like login) and the user is logged in, redirect to dashboard.
        return <Navigate to="/dashboard" />;
    }

    
    return <Outlet />;
}

export default PrivateRoute;
