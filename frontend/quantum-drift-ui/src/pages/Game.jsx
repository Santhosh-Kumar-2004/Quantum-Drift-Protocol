import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Game.css";
import hoverSound from "../assets/sounds/hover-sound1.mp3"

import planet1 from "../assets/planet6.jpg";
import planet2 from "../assets/planet2.jpg";
import planet3 from "../assets/planet7.jpg";
import planet4 from "../assets/planet1.jpg";
import planet5 from "../assets/planet4.jpg";
import Starfield from "../components/StarField";

const planets = [
    { id: 1, name: "Zarion-5", difficulty: "Easy", image: planet1 },
    { id: 2, name: "Nebulon-6", difficulty: "Medium", image: planet2 },
    { id: 3, name: "Vortan-X", difficulty: "Hard", image: planet3 },
    { id: 4, name: "Kryllor", difficulty: "Extreme", image: planet4 },
    { id: 5, name: "Aetherion", difficulty: "Insane", image: planet5 },
];

export default function Game() {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    const handleLeft = () => {
        setIndex((prev) => (prev === 0 ? planets.length - 1 : prev - 1));
    };

    const handleRight = () => {
        setIndex((prev) => (prev === planets.length - 1 ? 0 : prev + 1));
    };

    const enterPlanet = () => {
        navigate(`/world/${planets[index].id}`);
    };

    const { name, difficulty, image } = planets[index];

    useEffect(() => {
        const body = document.body;

        const img = new Image();
        img.src = image;

        img.onload = () => {
            body.style.transition = "background-image 1s ease-in-out";
            body.style.backgroundImage = `url(${image})`;
            body.style.backgroundSize = "cover";
            body.style.backgroundRepeat = "no-repeat";
            body.style.backgroundPosition = "center";
            body.style.backgroundAttachment = "fixed";
        };

        return () => {
            body.style.backgroundImage = "";
        };
    }, [image]);

    const hoverAudio = new Audio(hoverSound);
    hoverAudio.volume = 0.4; // optional: adjust volume


    return (
        <>
        <Starfield />
        <div className="game-container">
            <h1 className="heading-orange">🪐 Select Your Planet</h1>

            <div className="carousel-wrapper">
                <div className="arrow-container left">
                    <button className="arrow" onClick={handleLeft}>⬅</button>
                </div>

                <div className={`planet-card glass active`}>
                    <img
                        src={image}
                        alt={name}
                        className="planet-preview"
                        onMouseEnter={() => hoverAudio.play()}
                    />

                    <h2 className="planet-name">{name}</h2>
                    <p className="planet-difficulty">Difficulty: {difficulty}</p>
                    <button className="btn-neon" onClick={enterPlanet} onMouseEnter={() => hoverAudio.play()}>
                        Enter Planet
                    </button>
                </div>

                <div className="arrow-container right">
                    <button className="arrow" onClick={handleRight}>➡</button>
                </div>
            </div>
        </div>
        </>
    );
}
