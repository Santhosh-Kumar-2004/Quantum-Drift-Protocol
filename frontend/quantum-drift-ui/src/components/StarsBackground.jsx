import { loadFull } from 'tsparticles';
import { useCallback } from 'react';
import Particles from 'react-tsparticles';

export default function StarsBackground() {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: { value: "transparent" } },
        particles: {
          number: { value: 80 },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: 2 },
          move: { enable: true, speed: 0.4, direction: "none", outModes: "bounce" }
        },
        fullScreen: { enable: true, zIndex: -1 }
      }}
    />
  );
}
