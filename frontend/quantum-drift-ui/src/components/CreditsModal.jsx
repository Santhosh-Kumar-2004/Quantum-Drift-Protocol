import { useState } from 'react';
import '../styles/CreditsModal.css';

export default function CreditsModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 999 }}>
        <button className="btn-neon" onClick={() => setOpen(true)}>🎮 Credits</button>
      </div>

      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Credits</h2>
            <p>Made with 💻 by Santhosh Kumar</p>
            <p>Powered by React, FastAPI, and Groq’s LLM</p>
            <p>Quantum Drift Protocol © 2025</p>
            <button onClick={() => setOpen(false)} className="btn-neon">Close</button>
          </div>
        </div>
      )}
    </>
  );
}
