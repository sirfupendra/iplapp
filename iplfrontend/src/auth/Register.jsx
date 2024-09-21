import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css'; 

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', {
                username,
                password,
            });
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    };

    return (
        <div className={styles.registerFormContainer}>
            {/* Background elements and animation */}
            <div className={styles.rotatingSquares}></div>
            <div className={styles.pulsingCircle}></div>
            
            <form className={styles.registerForm} onSubmit={handleRegister}>
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
                <button type="submit" className={styles.registerButton}>Register</button>
            </form>
        </div>
    );
}

export default Register;
