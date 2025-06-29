# 🚀 GalaxyQuest - Interplanetary Intelligence & Puzzle Missions

**GalaxyQuest** is a sci-fi themed full-stack web app where users explore planets, decode alien signals, play logic-based games, and complete intelligence puzzles. The project combines frontend mini-games, interactive puzzles, a HUD interface, and stunning UI—all backed by a FastAPI-powered backend and MySQL database.

---

## 🌌 Live Demo

📺 [Your Video Demo Link Here — YouTube, Google Drive, or Loom]

---

## 🧠 Features

- 🪐 Planet-based exploration interface with background transitions
- 🎮 5 Mini-Games (from easy to insane level)
- 🧩 Smart Puzzle System (with timer, retry, and reveal)
- ⚡ Floating HUD (Health, Energy, Score)
- 🌠 Galaxy map to navigate between planets
- 💾 Score saving using `localStorage`
- 🔐 Backend API using FastAPI + MySQL
- 🎨 Beautiful Glassmorphism + Neon-based UI

---

## 🛠 Tech Stack

| Frontend       | Backend     | Database | Other         |
|----------------|-------------|----------|---------------|
| React.js (Vite) | FastAPI     | MySQL    | UUID, Canvas, LocalStorage |
| React Router    | Pydantic    | SQLAlchemy | CSS Modules, HTML5 APIs |

---

## 📁 Project Structure

galaxyquest/
├── backend/
│ ├── main.py
│ ├── models/
│ ├── routers/
│ └── schemas/
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── styles/
│ │ ├── App.jsx
│ │ └── main.jsx

---

## 🚀 Getting Started

### ⚙ Prerequisites

- Node.js (v18+)
- Python 3.10+
- MySQL running locally

---

### 🔧 Backend Setup (FastAPI + MySQL)

```bash
# Clone the repository
git clone https://github.com/yourusername/galaxyquest.git
cd galaxyquest/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure DB (inside main.py or use .env file)
# Run backend server
uvicorn main:app --reload
```
---

## 🌐 Frontend Setup (React)

cd ../frontend

# Install packages
npm install

# Start dev server
npm run dev

Access the app at: http://localhost:5173
Backend should be running on http://localhost:8000

--- 
## 🎮 Mini-Games by Difficulty Level

| Level   | Game                | Description                           |
| ------- | ------------------- | ------------------------------------- |
| Easy    | Rock Paper Scissors | Fun reflex-based selection game       |
| Medium  | Memory Match        | Flip cards and find the correct pairs |
| Hard    | Drag & Drop Sorter  | Sort items into the correct order     |
| Extreme | Space Dodger        | Move the ship to avoid asteroids      |
| Insane  | Sequence Rush       | Memorize and repeat button sequence   |

--- 

## 🔁 Sample API Routes
POST /prompt – fetches planet intel/scan info
POST /puzzle – returns a unique puzzle per level
POST /score (optional) – submits score (if implemented)

---

## 🧩 Puzzle Mechanics
Countdown timer (30s)
Submit answer or retry
Reveal correct answer after failure
Score stored in localStorage
Restart & close modal options

---

## 🌌 Galaxy Map & Planet UI
Each planet reveals a unique puzzle and mini-game
HUD shows score, energy, and mission progress
Clickable planets in Galaxy Map
Fully animated transitions

---

📸 Screenshots & Video
![screenshot](./Quantum Drift Protocol/frontend/quantum-drift-ui/screenshots & vids/QDP project images)
![video](https://vimeo.com/1097320189/fbf1c3022c)

---

## 📦 Future Improvements
Add authentication and user profiles
Global leaderboard with backend storage
In-game sound effects and music
Save completed levels to DB

---

## 🧠 Inspiration
Created for a sci-fi hackathon to challenge players with brain-teasing logic puzzles and interactive mini-games across an alien galaxy.

---

## 📜 License
This project is licensed under the MIT License.

---

## ✨ Developer
Santhosh Kumar
Built with passion, creativity, and intergalactic energy. 🚀
Feel free to ⭐ star the repo if you found it interesting!

---

📬 Contact
GitHub: https://github.com/Santhosh-Kumar-2004
LinkedIn: https://www.linkedin.com/in/santhoshkumarv12136/
Email: santhoshkumarv12136@gmail.com

---


