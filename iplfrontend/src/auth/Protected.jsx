import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Protected() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/protected', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsername(response.data.logged_in_as);
            } catch (error) {
                console.error(error);
                navigate('/login');
            }
        };
        fetchUserData();
    }, [navigate]);

    return <h1>Welcome, {username}</h1>;
}

export default Protected;

