import React from 'react';
import styles from './LandingPage.module.css';
import {useNavigate} from 'react-router-dom';


const LandingPage = () => {
  const navigate=useNavigate();
 
  return (
    <div className={styles.wrapper}>
      

      <header className={styles.heroSection}>
      <p className={styles.subText}>Get real-time stats, performance insights, and more.</p>
        <h2 className={styles.heroText}>Analyze<span className={styles.highlight}> IPL Players</span>  Like Never Before</h2>
        
        <button className={styles.getStarted} onClick={()=>navigate('/register')}>Analyze Now</button>
      </header>

     
    </div>
  );
};

export default LandingPage;
