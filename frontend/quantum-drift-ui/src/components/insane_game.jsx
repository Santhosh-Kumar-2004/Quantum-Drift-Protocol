import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/insane_game.css";

export default function InsaneGame() {
  const [tiles, setTiles] = useState([]);
  const [current, setCurrent] = useState(1);
  const [timeLeft, setTimeLeft] = useState(16);
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    generateTiles();
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver]);

  const generateTiles = () => {
    const nums = Array.from({ length: 16 }, (_, i) => i + 1);
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    setTiles(nums);
    setCurrent(1);
    setTimeLeft(20);
    setGameOver(false);
  };

  const handleClick = (num) => {
    if (num !== current) {
      setGameOver(true);
    } else if (num === 16) {
      setGameOver(true); // all completed
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  return (
    <div className="insane-container">
      <div className="hud">
        <span>⏱ Time: {timeLeft}s</span>
        <span>🔢 Next: {current}</span>
        <button className="btn-back" onClick={() => navigate(-1)}>🔙 Back</button>
      </div>

      <h2 className="game-title">🧠 Sequence Rush</h2>

      <div className="grid">
        {tiles.map((num) => (
          <button
            key={num}
            className={`tile ${gameOver ? "disabled" : ""}`}
            onClick={() => !gameOver && handleClick(num)}
          >
            {num}
          </button>
        ))}
      </div>

      {gameOver && (
        <div className="game-over">
          <h3>Game Over</h3>
          <p>{current > 16 ? "You Won!" : `You reached: ${current - 1}`}</p>
          <button onClick={generateTiles}>Play Again</button>
        </div>
      )}
    </div>
  );
}
