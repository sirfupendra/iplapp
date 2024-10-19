

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useAuth } from './AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      if (response.status === 200) {
        login(response.data.access_token);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
      <div className={styles.heroTextContainer}>
          <h1 className={styles.heroText}>LOGIN</h1>
          <p className={styles.subText}>
            Access your account and manage everything with ease.
            Stay connected and organized, all in one place!
          </p>
        </div>

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

      <div className={styles.heroSection}>
        
       
      </div>
    </div>
  );
}

export default Login;
