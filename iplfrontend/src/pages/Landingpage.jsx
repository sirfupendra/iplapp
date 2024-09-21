import React from 'react';
import styles from './LandingPage.module.css';
import {useNavigate} from 'react-router-dom';

const LandingPage = () => {
  const navigate=useNavigate();
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>IPL   Player    Analysis</h1>
        <div className={styles.navButtons}>
          <button className={styles.loginButton} onClick={()=>navigate('/login')}>Login</button>
          <button className={styles.signupButton} onClick={()=>navigate('/register')}>Sign Up</button>
        </div>
      </nav>

      <header className={styles.heroSection}>
        <h2 className={styles.heroText}>Analyze IPL Players Like Never Before</h2>
        <p className={styles.subText}>Get real-time stats, performance insights, and more.</p>
        <button className={styles.getStarted} onClick={()=>navigate('/register')}>Get Started</button>
      </header>

      <div className={styles.animationWrapper}>
        <div className={styles.circle}></div>
        <div className={styles.square}></div>
        <div className={styles.triangle}></div>
      </div>
    </div>
  );
};

export default LandingPage;
