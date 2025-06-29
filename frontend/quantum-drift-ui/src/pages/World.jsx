import { Link, useParams } from "react-router-dom";
import "../styles/World.css";
import { useState, useEffect } from "react";
import PuzzleModal from "../components/PuzzleModal";
// Add at top with other imports
import { useRef } from "react";
import BackButton from "../components/BackButton";
import EasyGame from "../components/easy_game";



import planet1 from "../assets/planet6.jpg";
import planet2 from "../assets/planet2.jpg";
import planet3 from "../assets/planet7.jpg";
import planet4 from "../assets/planet1.jpg";
import planet5 from "../assets/planet4.jpg";

const backgrounds = {
  1: planet1,
  2: planet2,
  3: planet3,
  4: planet4,
  5: planet5,
};

export default function World() {
  const { id } = useParams();
  const planetId = parseInt(id);

  const [intel, setIntel] = useState(null);
  const [scan, setScan] = useState(null);
  const [planetData, setPlanetData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [puzzle, setPuzzle] = useState(null);
  const [showPuzzle, setShowPuzzle] = useState(false);

  const backgroundImage = backgrounds[planetId];

  const [progress, setProgress] = useState(0);
  const [health, setHealth] = useState(0);
  const [energy, setEnergy] = useState(0);

  const [glowIntel, setGlowIntel] = useState(false);
  const [glowScan, setGlowScan] = useState(false);
  const [glowPlanet, setGlowPlanet] = useState(false);

  const [decrypting, setDecrypting] = useState(false);

  // New: track score using localStorage
  const [score, setScore] = useState(() => {
    const stored = localStorage.getItem("puzzle_score");
    return stored ? parseInt(stored) : 0;
  });

  // New: Score update handler to pass to modal
  const incrementScore = () => {
    const newScore = score + 10;
    setScore(newScore);
    localStorage.setItem("puzzle_score", newScore.toString());
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Set random meter values (simulate system status)
      setProgress(Math.floor(Math.random() * 41) + 60); // 60–100%
      setHealth(Math.floor(Math.random() * 31) + 50);   // 50–80%
      setEnergy(Math.floor(Math.random() * 21) + 75);   // 75–95%

      try {
        const [intelRes, scanRes, planetDataRes] = await Promise.all([
          fetch("http://localhost:8000/prompt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "intel", level: planetId }),
          }),
          fetch("http://localhost:8000/prompt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "scan", level: planetId }),
          }),
          fetch("http://localhost:8000/prompt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "planet_data", level: planetId }),
          }),
        ]);

        const intelData = await intelRes.json();
        const scanData = await scanRes.json();
        const planetDataData = await planetDataRes.json();

        setTimeout(() => {
          setIntel(intelData.result);
          setScan(scanData.result);
          setPlanetData(planetDataData.result);

          // Trigger glows for 2 seconds
          setGlowIntel(true);
          setGlowScan(true);
          setGlowPlanet(true);

          setTimeout(() => {
            setGlowIntel(false);
            setGlowScan(false);
            setGlowPlanet(false);
          }, 2000);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [planetId]);

  const loadPuzzle = async () => {
    try {
      setDecrypting(true); // start decrypting screen

      const res = await fetch("http://localhost:8000/puzzle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "puzzle", level: planetId }),
        cache: "no-store",
      });

      const data = await res.json();

      setTimeout(() => {
        setPuzzle(data.puzzle);
        setShowPuzzle(true);
        setDecrypting(false);  // hide decrypting
      }, 2000); // delay to simulate decryption
    } catch (err) {
      console.error("Error loading puzzle:", err);
      setDecrypting(false);
    }
  };


  return (
    <div
      className="world-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <BackButton />
      {/* <div className="hud-bar">
        <span>🎯 Score: {score}</span>
      </div> */}
      <div className="hud-wrapper">
        <div className="hud-left">
          <span className="score-box">🎯 Score: {score}</span>
        </div>
      </div>

      {/* <button className="btn-galaxy-map" onClick={() => navigate("/galaxy")}>
        🗺️ Galaxy Map
      </button> */}

      <Link to="/map" className="btn-galaxy-map">
        🌌 Galaxy Map
      </Link>

      <h1 className="planet-heading">🌌 Planet {planetId} - Mission Overview</h1>
      <div className="hud-panel">
        <div className="hud-meter progress">
          <span>🚀 Mission</span>
          <div className="meter-bar">
            <div className="meter-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="hud-meter health">
          <span>❤️ Health</span>
          <div className="meter-bar">
            <div className="meter-fill" style={{ width: `${health}%` }} />
          </div>
        </div>
        <div className="hud-meter energy">
          <span>⚡ Energy</span>
          <div className="meter-bar">
            <div className="meter-fill" style={{ width: `${energy}%` }} />
          </div>
        </div>
      </div>



      <div className="world-grid">
        {loading ? (
          [1, 2, 3].map((i) => <div key={i} className="world-panel skeleton" />)
        ) : (
          <>
            {/* Section: Mission Intel */}
            <div className={`world-panel glass fade-in ${glowIntel ? "glow-flash" : ""}`}>
              <h2 className="section-heading">🛰️ Mission Intel</h2>
              {intel ? (
                <>
                  <h3>{intel.intel_title}</h3>
                  <p>{intel.intel_brief}</p>
                  {Array.isArray(intel.intel_details) && intel.intel_details.length > 0 && (
                    <ul>
                      {intel.intel_details.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <p>Signal lost... no intel received.</p>
              )}
            </div>

            {/* Section: Alien Life Scan */}
            <div className={`world-panel glass fade-in ${glowIntel ? "glow-flash" : ""}`}>

              <h2 className="section-heading">👽 Alien Life Scan</h2>
              {scan ? (
                <>
                  <h3>{scan.species_name}</h3>
                  <p>Threat Level: {scan.threat_level}</p>

                  {Array.isArray(scan.traits) && scan.traits.length > 0 && (
                    <>
                      <h4>Traits</h4>
                      <ul>
                        {scan.traits.map((trait, i) => (
                          <li key={i}>{trait}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {Array.isArray(scan.scan_notes) && scan.scan_notes.length > 0 && (
                    <>
                      <h4>Scan Notes</h4>
                      <ul>
                        {scan.scan_notes.map((note, i) => (
                          <li key={i}>{note}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </>
              ) : (
                <p>No lifeforms detected.</p>
              )}
            </div>

            {/* Section: Planetary Data */}
            <div className={`world-panel glass fade-in ${glowIntel ? "glow-flash" : ""}`}>

              <h2 className="section-heading">🪐 Planet Data</h2>
              {planetData ? (
                <>
                  <h3>{planetData.planet_name}</h3>
                  <p>Climate: {planetData.climate}</p>
                  <p>Gravity: {planetData.gravity}</p>

                  {Array.isArray(planetData.resources) && planetData.resources.length > 0 && (
                    <>
                      <h4>Resources</h4>
                      <ul>
                        {planetData.resources.map((res, i) => (
                          <li key={i}>{res}</li>
                        ))}
                      </ul>

                    </>
                  )}

                  {Array.isArray(planetData.hazards) && planetData.hazards.length > 0 && (
                    <>
                      <h4>Hazards</h4>
                      <ul>
                        {planetData.hazards.map((haz, i) => (
                          <li key={i}>{haz}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </>
              ) : (
                <p>Data unavailable. Check satellite uplink.</p>
              )}
            </div>

            {/* Mini Game: Easy Level (Only for Planet 1) */}
            {planetId === 1 && (
              <div className="mini-game-section glass fade-in">
                <h2 className="mini-game-title">🎮 Initiate: Rock, Paper, Scissors Challenge!</h2>
                <Link className="btn-neon" to="/easy">
                    Start Game
                </Link>
              </div>
            )}
            {planetId === 2 && (
              <div className="mini-game-section glass fade-in">
                <h2 className="mini-game-title">🧠 Memory Match Protocol: Neural Sync</h2>
                <Link className="btn-neon" to="/medium">
                  Start Game
                </Link>
              </div>
            )}
            {planetId === 3 && (
              <div className="mini-game-section glass fade-in">
                <h2 className="mini-game-title">🛠️ Drag-n-Sort Simulation: Order Reboot</h2>
                <Link className="btn-neon" to="/hard">
                  Start Game
                </Link>
              </div>
            )}
            {planetId === 4 && (
              <div className="mini-game-section glass fade-in">
                <h2 className="mini-game-title">🚀 Meteor Survival Test: Reflex Control</h2>
                <Link className="btn-neon" to="/extreme">
                  Start Game
                </Link>
              </div>
            )}
            {planetId === 5 && (
              <div className="mini-game-section glass fade-in">
                <h2 className="mini-game-title">🧬 Sequence Rush: AI Cognition Trial</h2>
                <Link className="btn-neon" to="/insane">
                  Start Game
                </Link>
              </div>
            )}


            {/* Puzzle Console */}
            <div className="puzzle-console glass fade-in">
              <h2>🎮 AI Puzzle Console</h2>
              <p>Ready to test your logic circuits?</p>
              <button className="btn-neon" onClick={loadPuzzle}>
                Engage Puzzle
              </button>
            </div>
            {/* <button onClick={() => navigate("/map")} className="btn-neon">🌌 Galaxy Map</button> */}


            {decrypting && (
              <div className="puzzle-backdrop">
                <div className="decrypting-box glassy">
                  <h2 className="decrypting-title">🧬 Decrypting Puzzle...</h2>
                  <div className="decrypting-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>
                </div>
              </div>
            )}


            {showPuzzle && puzzle && (
              <PuzzleModal
                puzzle={puzzle}
                onClose={() => {
                  setShowPuzzle(false);
                  setPuzzle(null);
                }}
                onCorrect={incrementScore} // ✅ Score handler
              />
            )}

          </>
        )}
      </div>
    </div>
  );
}
