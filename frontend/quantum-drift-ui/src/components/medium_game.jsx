import { useEffect, useState } from "react";
import "../styles/medium_game.css";

const cardImages = [
  { id: 1, emoji: "🌕" },
  { id: 2, emoji: "🪐" },
  { id: 3, emoji: "🌟" },
  { id: 4, emoji: "👽" },
  { id: 5, emoji: "🚀" },
  { id: 6, emoji: "🛰️" },
];

export default function MediumGame({ onBack }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => 0.5 - Math.random())
      .map((card, index) => ({ ...card, uniqueId: index }));

    setCards(shuffled);
  }, []);

  const handleFlip = (card) => {
    if (flipped.length === 2 || flipped.includes(card.uniqueId) || matched.includes(card.id)) return;
    setFlipped((prev) => [...prev, card.uniqueId]);

    if (flipped.length === 1) {
      const firstCard = cards.find((c) => c.uniqueId === flipped[0]);
      const secondCard = card;

      if (firstCard.id === secondCard.id) {
        setMatched((prev) => [...prev, firstCard.id]);
      }

      setTimeout(() => setFlipped([]), 900);
    }
  };

  const isFlipped = (card) => flipped.includes(card.uniqueId) || matched.includes(card.id);

  return (
    <div className="memory-container">
      <h1 className="memory-title">🧠 Memory Match</h1>
      <p className="memory-subtitle">Match the galactic symbols!</p>

      <div className="memory-grid">
        {cards.map((card) => (
          <div
            key={card.uniqueId}
            className={`memory-card ${isFlipped(card) ? "flipped" : ""}`}
            onClick={() => handleFlip(card)}
          >
            <div className="card-front">❔</div>
            <div className="card-back">{card.emoji}</div>
          </div>
        ))}
      </div>

      <button className="btn-memory-back" onClick={onBack}>⬅ Back</button>
    </div>
  );
}
