import { useState, useEffect } from "react";
import "../styles/PuzzleModal.css";

export default function PuzzleModal({ puzzle, onClose, onCorrect }) {
  const [selected, setSelected] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // ⏱️
  const [timeExpired, setTimeExpired] = useState(false);

  useEffect(() => {
    if (isSubmitted || timeExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setTimeExpired(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timeExpired]);

  const handleRestart = () => {
    // Close and trigger new puzzle fetch from parent
    onClose(); // This clears current puzzle and parent will load a new one
  };

  const handleSubmit = () => {
  if (!selected || isSubmitted || timeExpired) return;

  const correct = selected === puzzle.answer;
  setIsCorrect(correct);
  setIsSubmitted(true);

  if (correct && onCorrect) {
    onCorrect(); // ✅ Tell parent to update score
  }
};

  return (
    <div className="puzzle-backdrop">
      <div className="puzzle-modal glassy">
        <h2 className="puzzle-title">🧠 {puzzle.title}</h2>

        {/* Timer */}
        <p className={`puzzle-timer ${timeExpired ? "expired" : ""}`}>
          {timeExpired ? "⏳ Time’s up!" : `⏱️ ${timeLeft}s remaining`}
        </p>

        <p className="puzzle-question">{puzzle.question}</p>

        <div className="puzzle-choices">
          {puzzle.choices.map((choice, i) => (
            <button
              key={i}
              className={`puzzle-choice ${selected === choice ? "selected" : ""}`}
              onClick={() => !isSubmitted && !timeExpired && setSelected(choice)}
              disabled={isSubmitted || timeExpired}
            >
              {choice}
            </button>
          ))}
        </div>

        {/* Buttons */}
        {!isSubmitted ? (
          <div className="puzzle-buttons">
            <button
              className="btn-submit"
              onClick={handleSubmit}
              disabled={!selected || timeExpired}
            >
              Submit
            </button>
            <button className="btn-close" onClick={onClose}>Close</button>
          </div>
        ) : (
          <div className={`result ${isCorrect ? "success" : "fail"}`}>
            {isCorrect ? (
              "✅ Correct!"
            ) : (
              <>
                ❌ Wrong.
                <p className="answer-reveal">Answer: {puzzle.answer}</p>
              </>
            )}
            <div className="puzzle-buttons">
              <button className="btn-close" onClick={onClose}>Close</button>
              <button className="btn-submit" onClick={handleRestart}>New Puzzle</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
