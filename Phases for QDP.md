# 🚀 Phases of Quantum Drift Protocol

A sci-fi LLM-powered game built using **React.js + FastAPI**, integrated with **OpenRouter** to access advanced, free LLM models. This document outlines the complete roadmap, including setup, backend, frontend, gameplay logic, polish, and submission.

--- 

## 🌐 LLM Provider: OpenRouter

**OpenRouter** is a platform that allows developers to use **multiple LLMs (like Mixtral, Claude, Command R+, LLaMA3, etc.)** via one simple API interface. It’s free (with a generous tier), and supports system prompts, role control, and fast inference.

### ✅ Why OpenRouter?
- Free tier available
- You can choose from many powerful models (Mixtral, Claude, etc.)
- Easy to integrate with FastAPI
- Clean documentation
- Rate limits are fair

> We’ll use **Mixtral or Command R+** from OpenRouter for rich, fast, reliable responses.

---

## 📌 Project Stack

| Layer         | Tech                                      |
|---------------|-------------------------------------------|
| Frontend      | React (Vite)                              |
| Backend       | FastAPI                                   |
| LLM           | OpenRouter (Mixtral / Command R+)         |
| Deployment    | Vercel (frontend), Render/Railway (backend)|

---

## 📁 Project Phases

---

### 🔰 Phase 0 – Identity Setup
-  Finalize game name: **Quantum Drift Protocol**
-  Game description:
> “Quantum Drift Protocol is a sci-fi LLM-powered adventure where players drift through alien dimensions, facing challenges, decoding mysteries, and battling strange cosmic entities — all across five planets with rising difficulty and immersive experiences.”

---

### 🧱 Phase 1 – Project Setup & Structure

**Sub-Phases:**
1. Create root folders:
   - `/backend`
   - `/frontend`
2. Initialize Git repo and `README.md`
3. Create `.env` for API keys
4. Install core dependencies:
   - FastAPI, Uvicorn, python-dotenv, CORS, Requests
   - React, Axios, React Router

---

### 🔗 Phase 2 – LLM Integration (FastAPI)

**Sub-Phases:**
1. Sign up on Groq (get API key)
2. Create `/routers/game.py` with:
   - `POST /prompt` endpoint
   - `GET /start` endpoint
3. Write prompt templates for:  
   - Challenge generation
   - Mystery generation
   - Enemy behavior
4. Add API logic, retries, and error handling

---

### 🌍 Phase 3 – Game Engine Logic (Backend)

**Sub-Phases:**
1. Create planet-level data structure:
   - Planet name, ID, difficulty, config
2. Track game state per session:
   - Current planet, progress, history
3. Core logic for:
   - Planet unlocks
   - LLM response parsing
   - Validating success/failure from inputs

---

### 🎨 Phase 4 – Frontend Boilerplate

**Sub-Phases:**
1. Vite + React setup
2. Global sci-fi theme (CSS)
3. Page routing:
   - `/` – Landing
   - `/game` – Planet carousel
   - `/world/:id` – In-world view

---

### 🪐 Phase 5 – Planet Carousel UI

**Sub-Phases:**
1. Create horizontal carousel (scrollable planets)
2. Add sci-fi planet art for 5 worlds
3. Arrow buttons to scroll left/right
4. "Enter Planet" button on center planet
5. Animate entry:
   - Cloud image fades in/out
   - Then route to `/world/:id`

---

### ⚔️ Phase 6 – In-World Gameplay UI

**Sub-Phases:**
1. Display LLM response (challenge/mystery/enemy)
2. Input field for player actions
3. Display dynamic output from FastAPI
4. Handle riddle solving, battle decisions
5. Show success or failure feedback

---

### 🎁 Phase 7 – Level Progression + Rewards

**Sub-Phases:**
1. Save progress (React Context or localStorage)
2. Lock/unlock planets
3. After each planet, show:
   - Completion message
   - Visual reward (e.g., crystal, badge)
   - Continue to next level

---

### 🎨 Phase 8 – Polish, Effects, and Sound

**Sub-Phases:**
1. Add sound FX (hover, text type, win/loss)
2. Planet-specific ambient sound (optional)
3. Add sci-fi cursor glow, hover glow, button effects
4. Cloud/fog animations
5. Make UI responsive and mobile-friendly

---

### 🚀 Phase 9 – Deployment & Testing

**Sub-Phases:**
1. Deploy backend to:
   - **Render**, **Railway**, or **Fly.io**
2. Deploy frontend to:
   - **Vercel** or **Netlify**
3. Full game test:
   - Entering planets
   - Completing worlds
   - LLM responses working

---

### 📝 Phase 10 – Final Submission & Docs

**Sub-Phases:**
1. Finalize `README.md` with:
   - Game description
   - Tech stack
   - Run instructions
   - LLM use explanation
2. Create Devpost submission
3. Prepare 3-min demo video
4. Make quick pitch deck if required

---

## ✅ Optional Enhancements (Chosen)

- 🔊 Add sound effects (hover/click/ambient)
- 🌌 Progress bar: “2/5 Worlds Completed”
- 🖱️ Sci-fi glowing cursor and hover effects

---

Let’s build **Quantum Drift Protocol** — one world at a time. 🌌🚀
