// App.jsx
import { Routes, Route, Router } from 'react-router-dom'
import Landing from './pages/Landing'
import Game from './pages/Game'
import World from './pages/World'
import BackgroundMusic from './components/BackgroundMusic';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GalaxyMap from './pages/GalaxyMap';
import EasyGame from './components/easy_game';
import MediumGame from './components/medium_game';
import HardGame from './components/hard_game';
import ExtremeGame from './components/extreme_game';
import InsaneGame from './components/insane_game';

function App() {
  const navigate = useNavigate();
  const musicRef = useRef();

  const handleStart = () => {
    musicRef.current?.playMusic(); // Start music after user interaction
    navigate('/game');
  };
  return (
    <>
      <BackgroundMusic ref={musicRef} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game" element={<Game />} />
        <Route path="/world/:id" element={<World />} />
        <Route path="/map" element={<GalaxyMap />} />
        <Route path="/easy" element={<EasyGame onBack={() => navigate("/world/1")} />}/>
        <Route path="/medium" element={<MediumGame onBack={() => navigate("/world/2")} />} />
        <Route path="/hard" element={<HardGame onBack={() => navigate("/world/3")} />} />
        <Route path="/extreme" element={<ExtremeGame onBack={() => navigate("/world/4")} />} />
        <Route path="/insane" element={<InsaneGame onBack={() => navigate("/world/5")} />} />
      </Routes>
    </>
  )
}

export default App
