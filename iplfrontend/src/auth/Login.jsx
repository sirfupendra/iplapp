import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; 

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.access_token);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Invalid credentials');
        }
    };

    return (
        <div className={styles.loginFormContainer}>
            {/* Background and floating objects */}
            <div className={styles.backgroundCircles}></div>
            <div className={styles.floatingSquare}></div>
            <div className={styles.floatingCircle}></div>

            <form className={styles.loginForm} onSubmit={handleLogin}>
                <input 
                    type="text" 
                    className={styles.inputField} 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    className={styles.inputField} 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit" className={styles.loginButton}>Login</button>
            </form>
        </div>
    );
}

export default Login;
