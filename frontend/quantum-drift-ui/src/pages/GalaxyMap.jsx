import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GalaxyMap.css";
import BackButton from "../components/BackButton";

export default function GalaxyMap() {
  const navigate = useNavigate();
  const [visited, setVisited] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("visitedPlanets") || "[]");
    setVisited(stored);
  }, []);

  const handlePlanetClick = (id) => {
    // Add to visited
    const updated = Array.from(new Set([...visited, id]));
    localStorage.setItem("visitedPlanets", JSON.stringify(updated));
    navigate(`/world/${id}`);
  };

  const planets = [
    { id: 1, name: "Planet A" },
    { id: 2, name: "Planet B" },
    { id: 3, name: "Planet C" },
    { id: 4, name: "Planet D" },
    { id: 5, name: "Planet E" },
  ];

  return (
    <div className="galaxy-map-container">
        <BackButton />
      <h1 className="galaxy-title">🌀 Galaxy Map</h1>
      <div className="map-grid">
        {planets.map((planet) => (
          <div
            key={planet.id}
            className={`planet-node ${visited.includes(planet.id) ? "visited" : ""}`}
            onClick={() => handlePlanetClick(planet.id)}
          >
            <div className="planet-circle">{planet.id}</div>
            <span>{planet.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
