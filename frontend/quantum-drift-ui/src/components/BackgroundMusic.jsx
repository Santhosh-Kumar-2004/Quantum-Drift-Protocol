// src/components/BackgroundMusic.jsx
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const BackgroundMusic = forwardRef((_, ref) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    playMusic: () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.loop = true;
        audioRef.current.play();
        setIsPlaying(true);
      }
    },
    toggleMute: () => {
      if (audioRef.current) {
        if (audioRef.current.paused) {
          audioRef.current.play();
          setIsPlaying(true);
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    }
  }));

  return (
    <>
      <audio ref={audioRef} src="/assets/music/space-theme1.mp3" />
      <button
        className="btn-neon"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
        onClick={() => {
          if (isPlaying) {
            audioRef.current.pause();
          } else {
            audioRef.current.play();
          }
          setIsPlaying(!isPlaying);
        }}
      >
        {isPlaying ? '🔊 Mute' : '🔈 Unmute'}
      </button>
    </>
  );
});

export default BackgroundMusic;
