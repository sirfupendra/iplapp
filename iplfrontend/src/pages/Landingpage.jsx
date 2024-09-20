import React from 'react';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>IPL Player Analysis App</h1>
        <p className={styles.subtitle}>Analyze, Track, and Predict IPL Player Performances</p>
      </header>

      <div className={styles.buttonContainer}>
        <button className={styles.loginButton}>Login</button>
        <button className={styles.signupButton}>Sign Up</button>
      </div>
    </div>
  );
};

export default LandingPage;
