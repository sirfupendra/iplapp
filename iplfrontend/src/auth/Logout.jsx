// Logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the token from localStorage
        localStorage.removeItem('token');
        
        // Redirect to the login page after logout
        navigate('/login');
    }, [navigate]);

    return (
        <div>
            <h1>You have been logged out.</h1>
        </div>
    );
}

export default Logout;
