import { useEffect, useState } from "react";
import "../styles/hard_game.css";

const levels = [
  {
    title: "Planets by Distance from Sun",
    correctOrder: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn"],
  },
  {
    title: "Days of the Week (Start to End)",
    correctOrder: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  {
    title: "Stages of Human Life",
    correctOrder: ["Infant", "Child", "Teen", "Adult", "Senior"],
  },
  {
    title: "School Grades (Lowest to Highest)",
    correctOrder: ["1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade"],
  },
  {
    title: "Meal Times in a Day",
    correctOrder: ["Breakfast", "Lunch", "Snacks", "Dinner"],
  },
];


export default function HardGame({ onBack }) {
  const [currentLevel, setCurrentLevel] = useState(null);
  const [items, setItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [message, setMessage] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const loadNewLevel = () => {
    const newLevel = levels[Math.floor(Math.random() * levels.length)];
    setCurrentLevel(newLevel);
    setItems([...newLevel.correctOrder].sort(() => Math.random() - 0.5));
    setMessage("");
    setShowAnswer(false);
  };

  useEffect(() => {
    loadNewLevel();
  }, []);

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDrop = (index) => {
    const temp = [...items];
    const [removed] = temp.splice(draggedItem, 1);
    temp.splice(index, 0, removed);
    setItems(temp);
    setDraggedItem(null);
  };

  const checkOrder = () => {
    if (JSON.stringify(items) === JSON.stringify(currentLevel.correctOrder)) {
      setMessage("✅ Correct Order!");
    } else {
      setMessage("❌ Incorrect Order. Try Again.");
    }
  };

  const handleReset = () => {
    setItems([...currentLevel.correctOrder].sort(() => Math.random() - 0.5));
    setMessage("");
    setShowAnswer(false);
  };

  return (
    <div className="drag-container">
      <h1 className="drag-title">🧪 Logic Sorter</h1>
      <p className="drag-subtitle">{currentLevel?.title}</p>

      <ul className="drag-list">
        {items.map((item, index) => (
          <li
            key={index}
            draggable
            className="drag-item"
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="drag-buttons">
        <button className="btn-check" onClick={checkOrder}>Check</button>
        <button className="btn-reset" onClick={handleReset}>Reset</button>
        <button className="btn-new" onClick={loadNewLevel}>New Game</button>
        <button className="btn-answer" onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? "Hide Answer" : "Correct Answer"}
        </button>
        <button className="btn-back" onClick={onBack}>⬅ Back</button>
      </div>

      {message && <p className="drag-message">{message}</p>}

      {showAnswer && (
        <div className="answer-section">
          <h3 className="answer-heading">✅ Correct Order</h3>
          <ul className="correct-list">
            {currentLevel.correctOrder.map((item, i) => (
              <li key={i} className="correct-item">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
