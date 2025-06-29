import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';
import CreditsModal from '../components/CreditsModal';
import BackgroundMusic from '../components/BackgroundMusic';

export default function Landing() {
  const navigate = useNavigate();
  const musicRef = useRef();

  const handleStart = () => {
    musicRef.current?.playMusic(); // Start music after user interaction
    navigate('/game');
  };

  return (
    <div className="landing-container">
      {/* Background Music + Mute Button */}
      {/* <BackgroundMusic ref={musicRef} /> */}

      <h1 className="landing-title">Quantum Drift Protocol</h1>

      <p className="landing-tagline">
        Unravel the mysteries of space — one planet at a time.
      </p>

      <button className="btn-neon" onClick={handleStart}>
        Start Journey
      </button>

      <div className="menu-buttons">
        <button className="btn-subtle">Settings</button>
        <button className="btn-subtle">Credits</button>
        <button className="btn-subtle">Exit</button>
      </div>

      {/* Credits Modal Component */}
      <CreditsModal />
    </div>
  );
}
