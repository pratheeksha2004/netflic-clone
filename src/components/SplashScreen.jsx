// src/components/SplashScreen.jsx
import React, { useState, useEffect } from 'react';
import './SplashScreen.css';
import netflixNLogo from '../assets/N_logo.jpg'; // Import N logo
import netflixLogo from '../assets/logo.jpg'; // Import full logo

function SplashScreen({ onAnimationComplete }) {
  const [stage, setStage] = useState('N'); // 'N' | 'Full' | 'Complete'

  useEffect(() => {
    let timer1, timer2;

    if (stage === 'N') {
      timer1 = setTimeout(() => {
        setStage('Full'); // Transition to full logo after 1.5 seconds
      }, 1500);
    } else if (stage === 'Full') {
      timer2 = setTimeout(() => {
        setStage('Complete'); // Signal completion after full logo animation
        onAnimationComplete();
      }, 3000); // Adjust timing to match animation
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [stage, onAnimationComplete]);

  return (
    <div className="splash-screen">
      {stage === 'N' && (
        <div className="splash-logo-container n-logo">
          <img src={netflixNLogo} alt="Netflix N Logo" className="splash-logo" />
        </div>
      )}
      {stage === 'Full' && (
        <div className="splash-logo-container full-logo">
          <img src={netflixLogo} alt="Netflix Logo" className="splash-logo" />
        </div>
      )}
    </div>
  );
}

export default SplashScreen;