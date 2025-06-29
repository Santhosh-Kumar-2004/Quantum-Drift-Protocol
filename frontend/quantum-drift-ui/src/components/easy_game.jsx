import { useState } from "react";
import "../styles/easy_game.css";

const options = ["Rock", "Paper", "Scissors"];

export default function EasyGame({ onBack }) {
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");

  const play = (choice) => {
    const randomChoice = options[Math.floor(Math.random() * 3)];
    setPlayerChoice(choice);
    setComputerChoice(randomChoice);

    if (choice === randomChoice) {
      setResult("🤝 It's a Draw!");
    } else if (
      (choice === "Rock" && randomChoice === "Scissors") ||
      (choice === "Paper" && randomChoice === "Rock") ||
      (choice === "Scissors" && randomChoice === "Paper")
    ) {
      setResult("✅ You Win!");
    } else {
      setResult("❌ You Lose!");
    }
  };

  return (
    <div className="rps-container">
      <div className="rps-header">
        <h1>🪨 Rock vs 📄 Paper vs ✂️ Scissors</h1>
        <p className="rps-subtitle">First to beat the bot wins!</p>
      </div>

      <div className="rps-game">
        <div className="rps-buttons">
          {options.map((opt) => (
            <button key={opt} onClick={() => play(opt)} className="rps-btn">
              {opt}
            </button>
          ))}
        </div>

        <div className="rps-result">
          {playerChoice && (
            <div className="choices-display">
              <div className="choice-box">
                <h3>You</h3>
                <p>{playerChoice}</p>
              </div>
              <div className="choice-box">
                <h3>Computer</h3>
                <p>{computerChoice}</p>
              </div>
            </div>
          )}

          {result && <p className="result-text">{result}</p>}
        </div>
      </div>

      <button className="rps-back" onClick={onBack}>🔙 Back to Planet</button>
    </div>
  );
}
