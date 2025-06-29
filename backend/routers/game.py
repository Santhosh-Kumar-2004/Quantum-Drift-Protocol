from fastapi import APIRouter, HTTPException
from schemas.game import PromptRequest, StartResponse
from core.llm_client import generate_prompt

router = APIRouter()


@router.get("/start", response_model=StartResponse)
async def start_game():
    return {"message": "Welcome to Quantum Drift Protocol! Choose your planet and begin your journey."}


@router.post("/prompt")
async def get_prompt(request: PromptRequest):
    try:
        result = await generate_prompt(request.type, request.level)
        return {"result": result}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from core.session_state import get_session, start_new_session, update_current_planet, add_to_history
from core.llm_client import generate_prompt
from data.planets import planets
from core.game_state import get_planet_by_id
from schemas.game import PlayRequest, PlayResponse, GameEvent

@router.post("/play", response_model=PlayResponse)
async def play_planet(request: PlayRequest):
    user_id = request.user_id or "player_1"  # fallback
    session = get_session(user_id)
    if not session:
        session = start_new_session(user_id)

    planet = get_planet_by_id(request.planet_id)
    if not planet:
        raise HTTPException(status_code=404, detail="Planet not found")

    update_current_planet(user_id, request.planet_id)

    # Generate 1-3 items depending on level
    level = request.level
    challenge_count = min(level, 3)
    enemy_count = min((level + 1) // 2, 3)
    mystery_count = min((level + 1) // 2, 2)

    async def create_events(count, type_):
        events = []
        for _ in range(count):
            raw = await generate_prompt(type_, level)
            # Split title/description
            parts = raw.strip().split("\n", 1)
            title = parts[0].replace("**", "").strip()
            description = parts[1].strip() if len(parts) > 1 else "No description."
            events.append(GameEvent(title=title, description=description))
        return events

    challenges = await create_events(challenge_count, "challenge")
    enemies = await create_events(enemy_count, "enemy")
    mysteries = await create_events(mystery_count, "mystery")

    result = {
        "planet_id": planet["planet_id"],
        "planet_name": planet["planet_name"],
        "difficulty": planet["difficulty"],
        "challenges": challenges,
        "enemies": enemies,
        "mysteries": mysteries
    }

    add_to_history(user_id, planet["planet_id"], result)

    return result

from schemas.game import PuzzleResponse

@router.post("/puzzle", response_model=PuzzleResponse)
async def get_puzzle(request: PromptRequest):
    try:
        puzzle_data = await generate_prompt("puzzle", request.level)
        return {"puzzle": puzzle_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
