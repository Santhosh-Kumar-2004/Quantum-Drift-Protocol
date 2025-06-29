# core/session_state.py

from typing import Dict, List

session_data: Dict[str, Dict] = {}

def start_new_session(user_id: str) -> Dict:
    session_data[user_id] = {
        "current_planet_id": None,
        "planet_history": []  # Store all visits for fun stats later
    }
    return session_data[user_id]

def get_session(user_id: str) -> Dict:
    return session_data.get(user_id)

def update_current_planet(user_id: str, planet_id: str):
    if user_id in session_data:
        session_data[user_id]["current_planet_id"] = planet_id

def add_to_history(user_id: str, planet_id: str, events: Dict):
    if user_id in session_data:
        session_data[user_id]["planet_history"].append({
            "planet_id": planet_id,
            "events": events
        })
