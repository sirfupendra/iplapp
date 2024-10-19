// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import styles from './Register.module.css'; 

// function Register() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:5000/register', {
//                 username,
//                 password,
//             });
//             navigate('/login');
//         } catch (error) {
//             console.error(error);
//             alert('Registration failed');
//         }
//     };

//     return (
//         <div className={styles.registerFormContainer}>
//             {/* Background elements and animation */}
//             <div className={styles.rotatingSquares}></div>
//             <div className={styles.pulsingCircle}></div>
            
//             <form className={styles.registerForm} onSubmit={handleRegister}>
//                 <input 
//                     type="text" 
//                     className={styles.inputField} 
//                     placeholder="Username" 
//                     value={username} 
//                     onChange={(e) => setUsername(e.target.value)} 
//                     required 
//                 />
//                 <input 
//                     type="password" 
//                     className={styles.inputField} 
//                     placeholder="Password" 
//                     value={password} 
//                     onChange={(e) => setPassword(e.target.value)} 
//                     required 
//                 />
//                 <button type="submit" className={styles.registerButton}>Register</button>
//             </form>
//         </div>
//     );
// }

// export default Register;

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
      await axios.post('http://localhost:5000/register', { username, password });
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <div className={styles.registerFormContainer}>
      {/* Left side with the image */}
      <div className={styles.heroSection}>
        <h1 className={styles.heroText}>Welcome to Our Platform!</h1>
        <p className={styles.subText}>
          Create your account to access personalized content, track orders, and 
          stay updated. Join us and experience seamless management!
        </p>
      </div>

      {/* Registration Form */}
      <form className={styles.registerForm} onSubmit={handleRegister}>
        <h1 className={styles.heroText}>Register</h1>
        <p className={styles.subText}>Please fill in the form to create an account.</p>

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
        
        <button type="submit" className={styles.registerButton}>
          Register
        </button>

        <p className={styles.subText}>Already have an account?</p>
        <span className={styles.linkText} onClick={() => navigate('/login')}>
          Login here
        </span>
      </form>
    </div>
  );
}

export default Register;
