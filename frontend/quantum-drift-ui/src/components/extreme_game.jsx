import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/extreme_game.css";

export default function ExtremeGame() {
  const [asteroids, setAsteroids] = useState([]);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [fallSpeed, setFallSpeed] = useState(2);
  const [gameRunning, setGameRunning] = useState(true);
  const gameRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!gameRunning) return;

    const spawnInterval = setInterval(() => {
      const newAsteroid = {
        id: Date.now(),
        left: Math.random() * 90,
        top: 0,
      };
      setAsteroids((prev) => [...prev, newAsteroid]);
    }, 1000);

    return () => clearInterval(spawnInterval);
  }, [gameRunning]);

  useEffect(() => {
    if (!gameRunning) return;

    const fallInterval = setInterval(() => {
      setAsteroids((prev) =>
        prev
          .map((a) => ({ ...a, top: a.top + fallSpeed }))
          .filter((a) => {
            if (a.top > 95) {
              setHealth((h) => h - 1);
              return false;
            }
            return true;
          })
      );
    }, 100);

    return () => clearInterval(fallInterval);
  }, [fallSpeed, gameRunning]);

  useEffect(() => {
    if (score > 0 && score % 20 === 0) {
      setFallSpeed((prev) => Math.min(prev + 1, 10)); // cap at speed 10
    }
  }, [score]);

  useEffect(() => {
    if (health <= 0) {
      setGameRunning(false);
    }
  }, [health]);

  const destroyAsteroid = (id) => {
    if (!gameRunning) return;
    setAsteroids((prev) => prev.filter((a) => a.id !== id));
    setScore((s) => s + 1);
  };

  const restart = () => {
    setScore(0);
    setHealth(3);
    setFallSpeed(2);
    setAsteroids([]);
    setGameRunning(true);
  };

  return (
    <div className="extreme-container" ref={gameRef}>
      <h2 className="game-title">☄️ Asteroid Defender</h2>

      <div className="hud">
        <span>💥 Score: {score}</span>
        <span>❤️ Health: {health}</span>
        <button className="btn-back" onClick={() => navigate(-1)}>🔙 Back</button>
      </div>

      <div className="game-space">
        {asteroids.map((a) => (
          <div
            key={a.id}
            className="asteroid"
            onClick={() => destroyAsteroid(a.id)}
            style={{ left: `${a.left}%`, top: `${a.top}%` }}
          />
        ))}
      </div>

      {!gameRunning && (
        <div className="game-over">
          <h3>💀 Game Over</h3>
          <p>Final Score: {score}</p>
          <button onClick={restart}>Play Again</button>
        </div>
      )}
    </div>
  );
}
