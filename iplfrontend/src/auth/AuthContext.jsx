// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('http://localhost:5000/protected', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data.logged_in_as);
           
        } catch (error) {
            console.error("Error fetching user data:", error);
            logout(); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const isAuthenticated = () => {
        return user !== null;
    };


    const login = async (token) => {

        localStorage.setItem('token', token);
        await fetchUserData(); 
        navigate('/dashboard'); 
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user,isAuthenticated ,login, logout, loading  }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
